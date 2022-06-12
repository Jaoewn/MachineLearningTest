# MachineLearningTest

EC2 INSTANCE SETUP:
Create new AWS EC2 instance with Ubuntu Server 22
Open Inbound Port 80

INSTALLING GIT IN HOME DIRECTORY:
sudo apt-get install git -y
git clone https://authtoken@github.com/Jaoewn/MachineLearningTest

INSTALLING NODE IN HOME DIRECTORY
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install 16
node -v

INSTALLING PM2 IN HOME DIRECTORY:
npm install -g pm2 -y

INSTALLING TensorFlow IN WORKING DIRECTORY:
npm init
npm install --save @tensorflow/tfjs
