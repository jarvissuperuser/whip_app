# The Big Bang Theory Whip App 

Cordova Version

## setup

>> in Linux Terminal

    ...
    phonegap/cordova create name_of_project
    cd name_of_project/
    cp -a /path/to/clone/of/code/www/* ./www/


#### android-minSdkVersion (Android only)

Minimum SDK version supported on the target device. Maximum version is blank by default.

This template sets the minimum to `14`.

    <preference name="android-minSdkVersion" value="14" />

### plugins required
    
    phonegap/cordova plugin add cordova-plugin-device-motion

### building and running the app..
    
    phonegap/cordova run android

this was tested on android.
