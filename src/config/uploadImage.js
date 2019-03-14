import ImagePicker from 'react-native-image-picker';
export const chooseImage =  () => {
    let options = {
        title: 'Lựa chọn ảnh',
        takePhotoButtonTitle: "Chụp ảnh",
        chooseFromLibraryButtonTitle: "Từ thư viện",
        storageOptions: {
            skipBackup: true,
            path: 'images'
        }
    };
    return new Promise((resovel, reject) => {
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
                
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                
            } else {
                resovel(response.uri)
            }
        });
    })
}
