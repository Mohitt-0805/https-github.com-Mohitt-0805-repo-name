#include <iostream>
#include <queue>
using namespace std;

struct Node {
    int data;
    Node* left;
    Node* right;
    Node(int val) : data(val), left(nullptr), right(nullptr) {}
};


Node* buildTreeLevelOrder() {
    cout << "Enter root value (-1 for NULL): ";
    int val;
    cin >> val;
    if (val == -1) return nullptr;

    Node* root = new Node(val);
    queue<Node*> q;
    q.push(root);

    while (!q.empty()) {
        Node* curr = q.front();
        q.pop();

        int leftVal, rightVal;
        cout << "Enter left child of " << curr->data << " (-1 for NULL): ";
        cin >> leftVal;
        if (leftVal != -1) {
            curr->left = new Node(leftVal);
            q.push(curr->left);
        }

        cout << "Enter right child of " << curr->data << " (-1 for NULL): ";
        cin >> rightVal;
        if (rightVal != -1) {
            curr->right = new Node(rightVal);
            q.push(curr->right);
        }
    }

    return root;
}

// Morris Inorder Traversal
void morrisInorder(Node* root) {
    Node* curr = root;
    cout << "\nMorris Inorder Traversal: ";
    while (curr != nullptr) {
        if (curr->left == nullptr) {
            cout << curr->data << " ";
            curr = curr->right;
        } else {
            Node* pre = curr->left;
            while (pre->right != nullptr && pre->right != curr)
                pre = pre->right;

            if (pre->right == nullptr) {
                pre->right = curr;
                curr = curr->left;
            } else {
                pre->right = nullptr;
                cout << curr->data << " ";
                curr = curr->right;
            }
        }
    }
}

int main() {
    Node* root = buildTreeLevelOrder();
    morrisInorder(root);
    return 0;
}
