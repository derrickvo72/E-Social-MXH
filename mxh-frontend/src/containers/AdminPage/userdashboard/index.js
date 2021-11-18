import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Container,
  Box,
  Avatar,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import InfoIcon from "@mui/icons-material/Info";
import SearchIcon from "@mui/icons-material/Search";
import { useStyles } from "../paganigationStyle";
import Swal from "sweetalert2";
import EditUser from "./editUser";
import axios from "axios";
import { userApi } from "./../../../axiosApi/api/userApi";
import { adminApi } from "./../../../axiosApi/api/adminApi";
import { useCookies } from "react-cookie";

export const UserDashboard = () => {
  const [pageSize, setPageSize] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [data, setData] = useState(null);
  const classes = useStyles();
  const [cookies, setCookie, removeCookie] = useCookies(["auth"]);
  const onClose = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    callResultUser(); // chay api
    return () => clearTimeout(delayDebounceSearch);
  }, [search]);

  const handleOnKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      callResultUser();
    }
  };
  const callResultUser = async () => {
    setLoading(true);
    userApi
      .getAllUser()
      .then((result) => {
        console.log("result", result.data.results);
        if (search) {
          getuserByEmail().then((rs) => {
            console.log("value", rs);
            setData(rs.data.results);
          });
        } else setData(result.data.results);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        // console.log("Get user list error: ", error.response);
      });
  };
  const getuserByEmail = async () => {
    const result = await userApi.getUserFullName(search);
    return result;
  };
  const delayDebounceSearch = (event) =>
    setTimeout(() => {
      setSearch(event.target.value);
    }, 500);
  const handleDelete = async (userID) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        adminApi
          .deleteUser(cookies.auth.tokens.access.token, userID)
          .then((rs) => {
            //tat loading
            setLoading(false);
            //Get list user
            callResultUser();
            //Show success
            Swal.fire({
              icon: "error",
              title: "User has been Delelelte",
              showConfirmButton: false,
              timer: 1500,
            });
            // Swal.fire("Deleted!", "User has been deleted.", "success");
          })
          .catch((err) => {
            setLoading(false);
            Swal.fire({
              icon: "error",
              title: err.response.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
          });
      } else
        Swal.fire({
          icon: "warning",
          title: "Cancle action",
          showConfirmButton: false,
          timer: 1500,
        });
    });
  };

  return (
    <>
      <EditUser openDialog={openDialog} onClose={onClose} />
      <Container maxWidth="xl" style={{ padding: "1rem" }}>
        {/* Top and Search */}
        <Box>
          <Card variant="outlined">
            <CardContent>
              <Box sx={{ maxWidth: 400, minHeight: 30 }}>
                <TextField
                  className={classes.searchForm}
                  placeholder="Search..."
                  variant="outlined"
                  margin="dense"
                  fullWidth
                  id="search-manage-course"
                  name="search"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon fontSize="medium" color="action">
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    ),
                  }}
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  onKeyDown={handleOnKeyDown}
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
        {/* Data Body */}
        <div
          className={classes.dataGridContainer}
          style={{
            height: "550px",
            width: "100%",
            marginTop: "10px",
          }}
        >
          <DataGrid
            columns={[
              {
                field: "avatar",
                headerName: "Avatar",
                width: 120,
                headerAlign: "center",
                align: "center",
                renderCell: (params) => {
                  return (
                    <Avatar
                      src={`https://mxhld.herokuapp.com/v1/image/${params.row.avatar}`}
                      alt={"avatar"}
                      className={classes.avatar}
                    >
                      {params.row.userId}
                    </Avatar>
                  );
                },
              },
              {
                field: "email",
                headerName: "Username",
                minWidth: 120,
                flex: 1,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "gender",
                headerName: "Gender",
                minWidth: 60,
                flex: 1,
                headerAlign: "center",
                align: "center",
                // renderCell: (params) => {
                //   return <>{params.row.price + "$"}</>;
                // },
              },
              {
                field: "birthday",
                headerName: "Dob",
                minWidth: 160,
                flex: 1,
                headerAlign: "center",
                align: "center",
                // renderCell: (params) => {
                //   return (
                //     <Box>
                //       {params.row.courseCreators[0].firstName +
                //         " " +
                //         params.row.courseCreators[0].lastName}
                //     </Box>
                //   );
                // },
              },
              {
                field: "action",
                headerName: "Action",
                width: 120,
                flex: 1,
                headerAlign: "center",
                align: "center",
                renderCell: (params) => {
                  return (
                    <Box className={classes.actionBox}>
                      <div className="flex items-center justify-center space-x-1">
                        <div className="cursor-pointer flex items-center justify-center hover:bg-gray-200 hover:shadow rounded-full w-10 h-10">
                          <InfoIcon
                            color="info"
                            onClick={() => {
                              setOpenDialog(true);
                            }}
                          />
                        </div>
                        <div className="cursor-pointer flex items-center justify-center mr-5 hover:bg-gray-200 hover:shadow rounded-full w-10 h-10">
                          <DeleteOutlineIcon
                            className="cursor-pointer"
                            onClick={() => {
                              handleDelete(params.row.id);
                            }}
                            color="error"
                          />
                        </div>
                      </div>
                    </Box>
                  );
                },
              },
            ]}
            rows={data ? data : []}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            pageSize={pageSize}
            rowsPerPageOptions={[5, 10, 20]}
            pagination
            loading={loading}
          />
        </div>
      </Container>
    </>
  );
};
