const fileTypes = {
  IMAGE: 'IMAGE',
  AUDIO: 'AUDIO',
  VIDEO: 'VIDEO',
  TEXT: 'TEXT',
  RECALL:'RECALL',
};

const files = Object.keys(fileTypes);
module.exports = {
  files,
  fileTypes,
};