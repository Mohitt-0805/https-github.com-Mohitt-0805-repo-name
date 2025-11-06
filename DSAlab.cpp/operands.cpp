#include <iostream>
#include <stack>
#include <string>
using namespace std;

int precedence(char op) {
    if (op == '^')
        return 3;
    else if (op == '*' || op == '/')
        return 2;
    else if (op == '+' || op == '-')
        return 1;
    else
        return 0;
}

void push(stack<char> &s, char ch) {
    s.push(ch);
}

char pop(stack<char> &s) {
    if (!s.empty()) {
        char top = s.top();
        s.pop();
        return top;
    }
    return '\0';
}

int main() {
    string infix;
    cout << "Enter infix expression: ";
    getline(cin, infix);

    stack<char> s;
    string postfix = "";

    for (char ch : infix) {
        if (ch == ' ') {
            continue;
        }

        if (isalnum(ch)) {
            postfix += ch;
        }
        else if (ch == '(') {
            push(s, ch);
        }
        else if (ch == ')') {
            while (!s.empty() && s.top() != '(') {
                postfix += pop(s);
            }
            if (!s.empty())
                pop(s);
        }
        else { 
            while (!s.empty() && precedence(s.top()) >= precedence(ch)) {
                postfix += pop(s);
            }
            push(s, ch);
        }
    }

    while (!s.empty()) {
        postfix += pop(s);
    }

    cout << "Postfix Expression: " << postfix << endl;
    return 0;
}