export const openModal = (index, setSelectedIndex, setIsModalOpen) => {
  setSelectedIndex(index);
  setIsModalOpen(true);
};

export const closeModal = (setIsModalOpen) => {
  setIsModalOpen(false);
};

export const showNextImage = (index, images, setSelectedIndex) => {
  setSelectedIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
};

export const showPreviousImage = (index, images, setSelectedIndex) => {
  setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
};
