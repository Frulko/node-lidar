# Node Lidar

## Instruction
`npm install` 
`sudo npm start`

## Raspberry Pi requirements
Go to `sudo raspi-config`  
Set **Interfacing** > **Serial**  
Enable   
Reboot

Edit `/boot/cmdline.txt`
Remove from the file `console=serial0,115200` 
Then reboot

Have fun :)


## Ressources links 
- [Serial port usage on Pi](https://www.abelectronics.co.uk/kb/article/1035/raspberry-pi-3--4-and-zero-w-serial-port-usage)
