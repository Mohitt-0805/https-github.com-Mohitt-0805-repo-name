#include <iostream>
using namespace std;

int main() {
    int i, n, z;
    int arr[20];

    cout << "Enter the number of elements: ";
    cin >> n;

    cout << "Enter elements:\n";
    for (i = 0; i < n; i++) {
        cin >> arr[i];
    }

    cout << "Enter the number to be searched: ";
    cin >> z;

    bool found = false;
    for (i = 0; i < n; i++) {
        if (arr[i] == z) {
            cout << "The given value is at location: " << i + 1 << endl;
            found = true;
            break;  // exit loop once found
        }
    }

    if (!found) {
        cout << "Not found" << endl;
    }

    return 0;
}
