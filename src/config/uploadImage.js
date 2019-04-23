import ImagePicker from 'react-native-image-picker';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
export const chooseImage = () => {
    let options = {
        title: 'Lựa chọn ảnh',
        takePhotoButtonTitle: "Chụp ảnh",
        chooseFromLibraryButtonTitle: "Từ thư viện",
        maxWidth: 500,
        maxHeight: 500,
        storageOptions: {
            skipBackup: true,
            path: 'images'
        },
    };
    return new Promise((resovel, reject) => {
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {

                console.log('User cancelled image picker');
                resovel(null)
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
                resovel(null)

            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                resovel(null)
            } else {
                resovel(response)

            }
        });
    })
}

export const chooseFile = () => {
    let options = {
        title: 'Lựa chọn file',
        takePhotoButtonTitle: "Chụp ảnh",
        customButtons: [
            { name: 'customOptionKey', title: 'Từ thư viện' },
        ],
        // chooseFromLibraryButtonTitle: "Từ thư viện",
        maxWidth: 500,
        maxHeight: 500,
        storageOptions: {
            skipBackup: true,
            // path: 'images'
        },
    };
    return new Promise((resovel, reject) => {
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {

                console.log('User cancelled image picker');
                resovel(null)
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
                resovel(null)

            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                DocumentPicker.show({
                    filetype: [DocumentPickerUtil.allFiles()],
                }, (error, res) => {
                    // Android

                    resovel(res)
                   
                });

            } else {
                resovel(response)

            }
        });
    })
}