"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactMediaRecorder =
  exports.useReactMediaRecorder =
  exports.RecorderErrors =
    void 0;
var react_1 = require("react");
var RecorderErrors;
(function (RecorderErrors) {
  RecorderErrors["AbortError"] = "media_aborted";
  RecorderErrors["NotAllowedError"] = "permission_denied";
  RecorderErrors["NotFoundError"] = "no_specified_media_found";
  RecorderErrors["NotReadableError"] = "media_in_use";
  RecorderErrors["OverconstrainedError"] = "invalid_media_constraints";
  RecorderErrors["TypeError"] = "no_constraints";
  RecorderErrors["NONE"] = "";
  RecorderErrors["NO_RECORDER"] = "recorder_error";
})((RecorderErrors = exports.RecorderErrors || (exports.RecorderErrors = {})));
function useReactMediaRecorder(_a) {
  var _this = this;
  var _b = _a.audio,
    audio = _b === void 0 ? true : _b,
    _c = _a.video,
    video = _c === void 0 ? false : _c,
    _d = _a.onStop,
    onStop =
      _d === void 0
        ? function () {
            return null;
          }
        : _d,
    blobPropertyBag = _a.blobPropertyBag,
    _e = _a.screen,
    screen = _e === void 0 ? false : _e,
    _f = _a.mediaRecorderOptions,
    mediaRecorderOptions = _f === void 0 ? null : _f,
    _g = _a.askPermissionOnMount,
    askPermissionOnMount = _g === void 0 ? false : _g;
  var mediaRecorder = (0, react_1.useRef)(null);
  var mediaChunks = (0, react_1.useRef)([]);
  var mediaStream = (0, react_1.useRef)(null);
  var _h = (0, react_1.useState)("idle"),
    status = _h[0],
    setStatus = _h[1];
  var _j = (0, react_1.useState)(false),
    isAudioMuted = _j[0],
    setIsAudioMuted = _j[1];
  var _k = (0, react_1.useState)(null),
    mediaBlobUrl = _k[0],
    setMediaBlobUrl = _k[1];
  var _x = (0, react_1.useState)(null),
    mediaBlob = _x[0],
    setMediaBlob = _x[1];
  var _l = (0, react_1.useState)("NONE"),
    error = _l[0],
    setError = _l[1];
  var getMediaStream = (0, react_1.useCallback)(
    function () {
      return __awaiter(_this, void 0, void 0, function () {
        var requiredMedia, stream_1, audioStream, stream, error_1;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              setStatus("acquiring_media");
              requiredMedia = {
                audio: typeof audio === "boolean" ? !!audio : audio,
                video: typeof video === "boolean" ? !!video : video,
              };
              _a.label = 1;
            case 1:
              _a.trys.push([1, 8, , 9]);
              if (!screen) return [3, 5];
              return [
                4,
                window.navigator.mediaDevices.getDisplayMedia({
                  video: video || true,
                }),
              ];
            case 2:
              stream_1 = _a.sent();
              stream_1
                .getVideoTracks()[0]
                .addEventListener("ended", function () {
                  stopRecording();
                });
              if (!audio) return [3, 4];
              return [
                4,
                window.navigator.mediaDevices.getUserMedia({ audio: audio }),
              ];
            case 3:
              audioStream = _a.sent();
              audioStream.getAudioTracks().forEach(function (audioTrack) {
                return stream_1.addTrack(audioTrack);
              });
              _a.label = 4;
            case 4:
              mediaStream.current = stream_1;
              return [3, 7];
            case 5:
              return [
                4,
                window.navigator.mediaDevices.getUserMedia(requiredMedia),
              ];
            case 6:
              stream = _a.sent();
              mediaStream.current = stream;
              _a.label = 7;
            case 7:
              setStatus("idle");
              return [3, 9];
            case 8:
              error_1 = _a.sent();
              setError(error_1.name);
              setStatus("idle");
              return [3, 9];
            case 9:
              return [2];
          }
        });
      });
    },
    [audio, video, screen]
  );
  (0, react_1.useEffect)(
    function () {
      if (!window.MediaRecorder) {
        throw new Error("Unsupported Browser");
      }
      if (screen) {
        if (!window.navigator.mediaDevices.getDisplayMedia) {
          throw new Error("This browser doesn't support screen capturing");
        }
      }
      var checkConstraints = function (mediaType) {
        var supportedMediaConstraints =
          navigator.mediaDevices.getSupportedConstraints();
        var unSupportedConstraints = Object.keys(mediaType).filter(function (
          constraint
        ) {
          return !supportedMediaConstraints[constraint];
        });
        if (unSupportedConstraints.length > 0) {
          console.error(
            "The constraints " +
              unSupportedConstraints.join(",") +
              " doesn't support on this browser. Please check your ReactMediaRecorder component."
          );
        }
      };
      if (typeof audio === "object") {
        checkConstraints(audio);
      }
      if (typeof video === "object") {
        checkConstraints(video);
      }
      if (mediaRecorderOptions && mediaRecorderOptions.mimeType) {
        if (!MediaRecorder.isTypeSupported(mediaRecorderOptions.mimeType)) {
          console.error(
            "The specified MIME type you supplied for MediaRecorder doesn't support this browser"
          );
        }
      }
      if (!mediaStream.current && askPermissionOnMount) {
        getMediaStream();
      }
      return function () {
        if (mediaStream.current) {
          var tracks = mediaStream.current.getTracks();
          tracks.forEach(function (track) {
            return track.stop();
          });
        }
      };
    },
    [
      audio,
      screen,
      video,
      getMediaStream,
      mediaRecorderOptions,
      askPermissionOnMount,
    ]
  );
  var startRecording = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var isStreamEnded;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            setError("NONE");
            if (!!mediaStream.current) return [3, 2];
            return [4, getMediaStream()];
          case 1:
            _a.sent();
            _a.label = 2;
          case 2:
            if (!mediaStream.current) return [3, 5];
            isStreamEnded = mediaStream.current
              .getTracks()
              .some(function (track) {
                return track.readyState === "ended";
              });
            if (!isStreamEnded) return [3, 4];
            return [4, getMediaStream()];
          case 3:
            _a.sent();
            _a.label = 4;
          case 4:
            if (!mediaStream.current.active) {
              return [2];
            }
            mediaRecorder.current = new MediaRecorder(mediaStream.current);
            mediaRecorder.current.ondataavailable = onRecordingActive;
            mediaRecorder.current.onstop = onRecordingStop;
            mediaRecorder.current.onerror = function () {
              setError("NO_RECORDER");
              setStatus("idle");
            };
            mediaRecorder.current.start();
            setStatus("recording");
            _a.label = 5;
          case 5:
            return [2];
        }
      });
    });
  };
  var onRecordingActive = function (_a) {
    var data = _a.data;
    mediaChunks.current.push(data);
  };
  var onRecordingStop = function () {
    var chunk = mediaChunks.current[0];
    var blobProperty = Object.assign(
      { type: chunk.type },
      blobPropertyBag || (video ? { type: "video/mp4" } : { type: "audio/mp3" })
    );
    var blob = new Blob(mediaChunks.current, blobProperty);
    var url = URL.createObjectURL(blob);
    setStatus("stopped");
    setMediaBlobUrl(url);
    setMediaBlob(blob);
    onStop(url, blob);
  };
  var muteAudio = function (mute) {
    setIsAudioMuted(mute);
    if (mediaStream.current) {
      mediaStream.current.getAudioTracks().forEach(function (audioTrack) {
        return (audioTrack.enabled = !mute);
      });
    }
  };
  var pauseRecording = function () {
    if (mediaRecorder.current && mediaRecorder.current.state === "recording") {
      setStatus("paused");
      mediaRecorder.current.pause();
    }
  };
  var resumeRecording = function () {
    if (mediaRecorder.current && mediaRecorder.current.state === "paused") {
      setStatus("recording");
      mediaRecorder.current.resume();
    }
  };
  var stopRecording = function () {
    if (mediaRecorder.current) {
      if (mediaRecorder.current.state !== "inactive") {
        setStatus("stopping");
        mediaRecorder.current.stop();
        mediaStream.current &&
          mediaStream.current.getTracks().forEach(function (track) {
            return track.stop();
          });
        mediaChunks.current = [];
      }
    }
  };
  return {
    error: RecorderErrors[error],
    muteAudio: function () {
      return muteAudio(true);
    },
    unMuteAudio: function () {
      return muteAudio(false);
    },
    startRecording: startRecording,
    pauseRecording: pauseRecording,
    resumeRecording: resumeRecording,
    stopRecording: stopRecording,
    mediaBlobUrl: mediaBlobUrl,
    mediaBlob: mediaBlob,
    status: status,
    isAudioMuted: isAudioMuted,
    previewStream: mediaStream.current
      ? new MediaStream(mediaStream.current.getVideoTracks())
      : null,
    previewAudioStream: mediaStream.current
      ? new MediaStream(mediaStream.current.getAudioTracks())
      : null,
    clearBlobUrl: function () {
      if (mediaBlobUrl) {
        URL.revokeObjectURL(mediaBlobUrl);
        setMediaBlob(null);
      }
      setMediaBlobUrl(null);
      setStatus("idle");
    },
  };
}
exports.useReactMediaRecorder = useReactMediaRecorder;
var ReactMediaRecorder = function (props) {
  return props.render(useReactMediaRecorder(props));
};
exports.ReactMediaRecorder = ReactMediaRecorder;
