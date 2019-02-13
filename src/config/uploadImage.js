import ImagePicker from 'react-native-image-picker';
export const chooseImage =  (callback)=> {
    // alert('aaa')
    var options = {
        title: 'Select Avatar',
        // customButtons: [
        //     { name: 'fb', title: 'Choose Photo from Facebook' },
        // ],
        storageOptions: {
            skipBackup: true,
            path: 'images'
        }
    };
    ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);
        
        if (response.didCancel) {
            // callback(null)
            console.log('User cancelled image picker');
        } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
        } else {
            var urlUpload = response.uri;
        
          
            callback(urlUpload)
        }
    });
}
