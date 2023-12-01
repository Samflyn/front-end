#!/bin/bash

# # type -> to check if a command is shell builtin

# type echo

# # single quotes -> prevent expansion of variables i.e literal strings
# # double quotes -> for interpreting variables

# WORD='script'
# echo '$WORD'
# echo "$WORD"
# echo "This is a shell $WORD"
# echo "This is a shell ${WORD}"
# echo "This is a shell $WORDing"
# echo "This is a shell ${WORD}ing"
# WORD='cool'
# echo "This is ${WORD}"

# # to store output to a variable
# # USER_NAME=`id` # older syntax

# USER_NAME=$(id)
# echo ${USER_NAME}

# if [[ "${UID}" -eq 1000 ]]; then
#     echo "cool"
#     # exit 1
# else
#     echo "not cool"
#     exit 1
# fi

# # exit status 0 -> sucessful
# # exit status non 0 -> termination
# # if value is omitted, the exit status is that of the last command status

# # to check the last exit status
# # ${?} stores last exit status

# if [[ "${?}" -ne 0 ]]; then
#     echo "command failed"
# else
#     echo "command succeded"
# fi

# # for reading input, it can be from a keyboard or from pipe

# type read
# type -a read

# read -p "Enter username: " USER_NAME
# read -p "Enter password: " -s PASSWORD

# echo ${USER_NAME}
# echo ${PASSWORD}

# # event designator -> execute previous command that starts with the string
# # !e

# # random data

# echo ${RANDOM}

# echo date +%s%N | sha512sum | head -c8

# SYMBOLS='!@#$%^&*()_+'

# # ehco ${SYMBOLS} | fold -w1 | shuff | head -c1

# echo

# # ${0} is a positional paramater
# # posotional paramaters are variables that contain contents of command line
# # paramater is variable used inside the shell script
# # argument is data passed into shell script

# # ${1} is an argument

# echo "You executed this command: ${0}"
# echo "You passed this as the first argument: ${1}"

# # to find the executable path

# which head

# # to find all matching executables

# which -a head

# # bash uses hash table to remember full path of the executable
# # of an executable is removed bash shows an error, to reset hash table

# hash -r

# # basename strips the directory path

# basename /no/file/here.txt

# # both basename and dirname do not check if the file exists

# # dirname strips the file name

# dirname /no/file/here.txt

# # to check no of arguments passed

# # the {} are optional

# echo "You passed ${#} arguments"
# echo "You passed $# arguments"

# for x in one two three; do
#     echo "Hi ${x}."
# done

# # ${@} refers to ${1} ${2} ${3}
# # ${*} refers to all arguments as single argument

# for x in ${@}; do
#     echo "${x}"
# done

# for x in ${*}; do
#     echo "${x}"
# done

# # sleep can be used to delay execution for specified amount of time in sec

# # shift -> used to shift the arguments by specified amount, default is 1

# while [[ "${#}" -gt 0 ]]; do
#     echo "number of arguments: ${#}"
#     echo "${1}"
#     echo "${2}"
#     echo "${3}"
#     shift
#     sleep 2
# done

# # input, output

# FILE="tempo"

# # to redirect standard output STDOUT
# # using single > creates or overwrites the file

# head -n1 /etc/passwd >${FILE}
# echo "append to file" >>${FILE}
# cat ${FILE}

# # to redirect standard input STDIN

# read LINE <${FILE}
# echo "Line contains: ${LINE}"

# # everything is a file
# # File Discriptors are pointers to sources of data or whare it can be written
# # FD0 -> STDIN, FD1 -> STDOUT, FD2 -> STDERR

# read LINE 0<${FILE}
# echo "hello" 1>${FILE}
# cat temppp 2>${FILE}

# # redirect STDOUT & STDERR to different files

# head -n1 tempo temppoo >head.out 2>>head.err

# # to same file
# # older syntax
# head -n1 tempo temppoo >head.both 2>&1

# # new syntax
# head -n1 tempo temppoo &>>head.both

# # STDERR will not be passed through pipes
# # to force all data through pipes

# head -n1 tempo temppoo | cat -n

# # old syntax

# head -n1 tempo temppoo 2>&1 | cat -n

# # new syntax

# head -n1 tempo temppoo |& cat -n

# # to not show output or save it to file trhow it to null device or bit bucket

# echo "Throw me away" >/dev/null
# echo "Throw me away" 2>/dev/null # for output
# echo "Throw me away" &>/dev/null # for both

# rm ${FILE}

# # case statements

# if [[ "${1}" = "start" ]]; then
#     echo "Starting..."
# elif [[ "${1}" = "stop" ]]; then
#     echo "Stopping..."
# else
#     echo "Supply a valid option." >&2
#     exit 1
# fi

# case "${1}" in
# start)
#     echo "Starting..."
#     ;;
# stop | stopp | --stop | --stopp)
#     echo "Stopping..."
#     ;;
# *)
#     echo "Supply a valid option." >&2
#     exit 1
#     ;;
# esac

# functions

log() {
    echo "Called Log function!"
}

function logging() {
    echo "Called Logging function!"
}

log
logging

# local variable scope
# local can only be used inside functions
# return should be used for function and exit for scripts

log() {
    local MESSAGE="${@}"
    echo "${MESSAGE}"
    return 1
}

log "Hello There"

# readonly -> constant

readonly VARIABLE="true"

# to add to systemd logs

logger "Some user defines logs!!!"

########## getopts ##########
## for parsing command line parameters

