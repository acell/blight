#include <iostream>

int main()
{
    char mystring[] = "string hubal boo";
    std::cout << mystring << " has " << sizeof(mystring) << " characters.\n";
    int cap = 0;
    for (int index = 0; index < sizeof(mystring); ++index) {
        if (index == cap) {
            mystring[index] = 'K';
        }
        if (mystring[index] == ' ') {
            cap = index + 1;
        }
        std::cout << mystring[index] << " ";
    }
    return 0;
}
