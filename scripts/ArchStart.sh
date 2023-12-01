#!/bin/bash
if [[ "${UID}" -eq 0 ]]; then
    chsh -s /usr/bin/fish sam
    echo 'FONT=lat2-16' >>/etc/vconsole.conf
    echo 'FONT_MAP=8859-2' >>/etc/vconsole.conf
    echo '' >>/etc/pacman.conf
    echo '[chaotic-aur]' >>/etc/pacman.conf
    echo 'Include = /etc/pacman.d/chaotic-mirrorlist' >>/etc/pacman.conf
    pacman -Syyu --noconfirm
    pacman -S crda --noconfirm
    echo GRUB_FORCE_HIDDEN_MENU='true' >>/etc/default/grub
    wget https://gist.githubusercontent.com/anonymous/8eb2019db2e278ba99be/raw/257f15100fd46aeeb8e33a7629b209d0a14b9975/gistfile1.sh -O /etc/grub.d/31_hold_shift
    chmod a+x /etc/grub.d/31_hold_shift
    echo 'WIRELESS_REGDOM="IN"' >/etc/conf.d/wireless-regdom
    iw reg set IN
    iwconfig wlp6s0 power off
    pacman -Rns linux linux-headers --noconfirm
    pacman -S tlp intel-ucode linux-firmware acpi_call-dkms archlinux-keyring linux-tkg-bmq linux-tkg-bmq-headers yay pamac-aur --noconfirm
    grub-mkconfig -o /boot/grub/grub.cfg
    systemctl enable tlp
    echo 'done...'
    exit 0
else
    echo 'Please run as sudo'
    exit 1
fi
