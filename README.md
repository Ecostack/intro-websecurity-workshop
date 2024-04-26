# Introduction to Web Security and OWASP TOP 10 with JavaScript Workshop

This project contains a suite of security tests designed to sharpen your knowledge around common vulnerabilities in web security. 

The test cases are categorized based on the Common Weakness Enumeration (CWE) standards and align with the OWASP Top 10 risks.


## Prerequisites

Before attending the workshop, participants should have:

- **Basic Understanding of Web Development**: Familiarity with HTML, CSS, and JavaScript is essential.
- **JavaScript and Node.js**: Ability to write JavaScript code and some experience with Node.js and npm.
- **RESTful Services**: Knowledge of REST APIs and how client-server communication works in a web environment.
- **Version Control**: Basic knowledge of version control with Git and GitHub.
- **Developer Tools**: Experience with using developer tools in web browsers for debugging.
- **Command Line Proficiency**: Comfort with using command line interfaces (CLI) to run commands, navigate directories, etc.

## Workshop Goals

By the end of this workshop, you should be able to:

- Identify and understand the top 10 web security vulnerabilities as defined by OWASP.
- Write and run security tests using JavaScript and Node.js to simulate common web attacks.
- Apply best practices to secure web applications against common security threats.
- Diagnose and fix vulnerabilities in a web application to prevent security breaches.


## Project Structure

The test suite is organized into directories that reflect different types of security concerns:

- **a01-broken-access-control**: Tests for access control issues.
- **a02-cryptographic-failures**: Tests for failures in cryptography.
- **a03-injection**: Tests for injection vulnerabilities.
- **a04-insecure-design**: Tests for flaws due to insecure design.
- **a05-security-misconfiguration**: Tests for security misconfiguration issues.
- **a06-vulnerable-and-outdated-components**: Tests for using vulnerable or outdated components.
- **a07-identification-and-authentication-failures**: Tests for identification and authentication issues.
- **a08-software-and-data-integrity-failures**: Tests for software and data integrity problems.
- **a09-security-logging-and-monitoring-failures**: Tests for failures in logging and monitoring.
- **a10-server-side-request-forgery**: Tests for server-side request forgery vulnerabilities.


## Setup

### Required Node.js version

Make sure to have at least version **20** of Node.js.

Check the current version via: 

```shell
node -v
```

### Install dependencies

Install all required dependencies with the following command:

```shell
npm install
```


## Workshop content

This workshop requires you to go through all the test cases and fix the failing tests one by one. The code will have `TODO` which will guide you.

### Running Tests

To run the tests, navigate to the project root directory and execute the following command:

```shell
npm test
```

Run single tests like the following:

```shell
npm run test-a01
```

Please check the `package.json` for all defined test cases.

### Solutions

In case you are not able to proceed, there are solutions available in the folder `solution-only-open-for-hints`.


### Additional Resources

To further your understanding and skills in web security, consider exploring the following resources:

- **OWASP Top 10**: [OWASP Top 10 Web Application Security Risks](https://owasp.org/www-project-top-ten/)
- **Node.js Security**: [Node.js Security Best Practices](https://nodejs.org/en/about/security/)
- **Mozilla Developer Network**: [MDN Web Docs on Security](https://developer.mozilla.org/en-US/docs/Web/Security)
- **Web Security Academy**: [PortSwigger's Web Security Academy](https://portswigger.net/web-security)
- **Cryptography**: [Crypto101 - The introductory book on cryptography](https://www.crypto101.io/)
- **Coursera**: Various web security courses and specializations available on [Coursera](https://www.coursera.org/)
- **Pluralsight Security Courses**: [Pluralsight's Web Security Courses](https://www.pluralsight.com/paths/web-security)
- **GitHub Security Lab**: [Learn and contribute to security research](https://securitylab.github.com/)
