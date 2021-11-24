import React, { useState, useEffect, useRef } from "react";
import Dialog from "@mui/material/Dialog";
import Picker from "emoji-picker-react";
import "./postshow.css";
import { styled } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import CircularStatic from "./../../containers/LoadingPage/upfileLoading";
import Box from "@mui/material/Box";
import { useOnClickOutside } from "./../../utils/handleRefresh";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    height: "450px",
  },
  "& .MuiPaper-root": {
    overflow: "hidden",
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, onConfirm, ...other } = props;
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onConfirm ? (
        <IconButton
          aria-label="close"
          onClick={() => {
            // onClose();
            onConfirm();
          }}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            zIndex: 50,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const PostDialog = (props) => {
  const { onClose, open } = props;
  const [uploadFile, setUploadFile] = useState(false);
  const [inputStr, setInputStr] = useState([]);
  const [textAreaCount, ChangeTextAreaCount] = useState(0);
  const [active, setActive] = useState(false);
  const modalRef = useRef(null);
  const buttonRef = useRef(null);
  const currentUser = useSelector((state) => state.auth.data);
  const hiddenFileInput = React.useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const [confirm, setonConfirm] = useState(false);
  useOnClickOutside(buttonRef, modalRef, () => setActive(false));

  const onEmojiClick = (e, emojiObject) => {
    setInputStr((prevInput) => prevInput + emojiObject.emoji);
    // ChangeTextAreaCount(inputStr.length);
    setActive(false);
  };
  const recalculate = (e) => {
    setInputStr(e.target.value);
    // ChangeTextAreaCount(e.target.value.length);
    // ChangeTextAreaCount(inputStr.length);
    // console.log("----------------------------");
    // console.log("Input", inputStr);
    // console.log("InputLenght", inputStr.length);
    // console.log("----------------------------");
  };

  // const onEmojiClick = (e, emojiObject) => {
  //   setInputStr((prevInput) => prevInput + emojiObject.emoji);
  //   ChangeTextAreaCount(inputStr.length);
  //   setActive(false);
  // };

  const handleConfirm = () => {
    setonConfirm(true);
  };

  const handleCloseConfirm = () => {
    setSelectedImage(null);
    setUserImage(null);
    setInputStr(null);
    setonConfirm(false);
    onClose();
  };

  const handleCloseConfirmSave = () => {
    setonConfirm(false);
    onClose();
  };

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const imageFileHandler = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    setUserImage(window.URL.createObjectURL(event.target.files[0]));
  };

  const delelteCurrentImage = () => {
    setSelectedImage(null);
    setUserImage(null);
    document.getElementById("fileChoosen").value = "";
  };

  const checkDisabled = (inputText, fileMedia) => {
    if (inputText?.length >= 1 || fileMedia) {
      return false;
    }
    return true;
  };

  // console.log("Check", checkDisabled());

  const onhandleSubmit = () => {
    let frmData = new FormData();
    frmData.append("file", selectedImage);
    const value = {
      text: inputStr,
      file: frmData,
    };
    console.log("Send Data", value);
  };
  // console.log("Selected-Before", selectedImage);
  // console.log("UserImage-Before", userImage);
  return (
    <div>
      <BootstrapDialog
        maxWidth="lg"
        height="600px"
        open={open}
        aria-labelledby="customized-dialog-title"
      >
        {
          <div className="right-1/2 left-1/2 top-1/2 absolute z-50 bg-green-700 cursor-pointer">
            <Dialog
              open={confirm}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                Are you want sure to cancle ?
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description"></DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    handleCloseConfirmSave();
                  }}
                >
                  Close but save status
                </Button>
                <Button
                  onClick={() => {
                    handleCloseConfirm();
                  }}
                  variant="contained"
                  color="error"
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    setonConfirm(false);
                  }}
                  variant="contained"
                  color="primary"
                >
                  Back
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        }
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onConfirm={handleConfirm}
        >
          <div className=" z-30 flex justify-center items-center justify-items-center ">
            <div className="flex-1">
              {userImage && (
                <button
                  className="bg-red-500 rounded-md  focus:outline-none
              transform hover:translate-y-1 transition-all duration-700"
                  onClick={() => delelteCurrentImage()}
                >
                  <p className="p-1 text-white text-base font-medium">
                    Delete File
                  </p>
                </button>
              )}
            </div>
            <div className="flex-none">
              <p className="text-mygrey font-medium text-2xl">
                Create new post
              </p>
            </div>
            <div className="flex-1"></div>
          </div>
        </BootstrapDialogTitle>
        {uploadFile && <CircularStatic />}
        <div className="grid grid-cols-5 gap-0.5">
          <div className="col-span-3  border-2 border-light-gray-700">
            <div
              style={{
                width: "550px",
                height: "550px",
              }}
              className="flex justify-center items-center"
            >
              {userImage && (
                <img
                  style={{
                    width: "550px",
                    height: "550px",
                  }}
                  // src="/assets/person/lam3.png"
                  src={userImage}
                  alt="img"
                  className="z-50"
                />
              )}
              <div className=" absolute z-40">
                <button
                  onClick={handleClick}
                  className=" mr-2 cursor-pointer border-2 border-gray-400 bg-white p-1 rounded-md text-gray-400 font-medium"
                >
                  Upload a file
                </button>
                <input
                  className=" hidden cursor-pointer left-0 top-1  font-medium absolute text-blue-500 text-sm "
                  type="file"
                  accept="image/*"
                  onChange={imageFileHandler}
                  id="fileChoosen"
                  ref={hiddenFileInput}
                />
              </div>
            </div>
          </div>
          <div className="col-span-2 border-2 border-light-gray-700 divide-y-2">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                padding: "5px",
              }}
            >
              <div className="flex items-center mt-2 ">
                <img
                  className="rounded-full h-10 w-10 mr-3"
                  src="/assets/person/lam5.png"
                  alt=""
                />
                <div className="flex-1 pr-4 flex items-center justify-between">
                  <Link
                    to={`/user/${currentUser?.fullname.replaceAll(" ", ".")}`}
                  >
                    <p className="font-bold text-md">username</p>
                  </Link>
                </div>
              </div>
              <textarea
                placeholder="what are you thinking?"
                cols=""
                rows="8"
                className=" boder-2 mt-2 font-normal text-lg text-black focus:outline-none"
                value={inputStr}
                // onChange={(e) => setInputStr(e.target.value)}
                onChange={recalculate}
              />
              <div className="flex justify-between items-center">
                <img
                  className="rounded w-7 h-7 cursor-pointer"
                  src={"/assets/image/emoji.png"}
                  alt="emokiimg"
                  onClick={() => setActive(!active)}
                  ref={buttonRef}
                />
                <p className="text-gray-400 text-xs font-semibold">
                  {textAreaCount}/2,200
                </p>
              </div>
              {active ? (
                <div
                  ref={modalRef}
                  className="absolute top-2/4 z-50 transform translate-y-20"
                >
                  <Picker
                    onEmojiClick={onEmojiClick}
                    disableSearchBar={true}
                    pickerStyle={{ width: "100%" }}
                  />
                </div>
              ) : null}
            </Box>
            <div className=" flex p-2 mb-2">
              <button
                type="button"
                className={`${
                  checkDisabled(inputStr, userImage) && "opacity-25"
                } 
           w-full p-2 bg-primarycolor rounded-full text-white font-bold uppercase text-lg  transform hover:translate-y-1 transition-all duration-700`}
                disabled={checkDisabled(inputStr, userImage)}
                onClick={() => {
                  onhandleSubmit();
                }}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </BootstrapDialog>
    </div>
  );
};

export default PostDialog;
