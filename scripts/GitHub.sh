#!/bin/bash
if [[ "${UID}" -ne 0 ]]; then
    echo "Make sure that gpg keys are in the same folder!!!"
    read -p "Would you like to continue y/n: " CONTINUE
    if [[ $CONTINUE = 'y' ]]; then
        git config --global user.name "Samflyn"
        git config --global user.email "akhil.sai701@gmail.com"
        git config --global pull.rebase true
        git config --global user.signingkey 6D915CAAA83A5952
        git config --global commit.gpgsign true
        gpg --import gpg.key
        echo 'done...'
        exit 0
    else
        echo 'Exiting...'
        exit 1
    fi
else
    echo 'Please do not run as root'
    exit 1
fi
