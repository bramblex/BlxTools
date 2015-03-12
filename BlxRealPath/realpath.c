/*
 * smaple realpath for Linux, OSX and Cgywin.
 * POSIX interface.
 */

#include<sys/param.h>
#include<stdlib.h>
#include<stdio.h>

int main(int argc, char** argv){
    if (argc != 2){
        printf("Usage: realpath <path>\n");
        return 1;
    }

    char* path = argv[1];
    char absolute_path[PATH_MAX];

    if (realpath(path, absolute_path)){
        printf("%s\n", absolute_path);
        return 0;
    }
    else{
        fprintf(stderr, "Bad path: %s\n", absolute_path);
        return 2;
    }
}
