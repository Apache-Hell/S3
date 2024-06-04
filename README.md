Great! Here's an updated version of your README file with the added server hosting and SSL certificate information:

```markdown
# DATA472 - Group Project: Speech to Text

## Introduction
This project aims to harness the capabilities of Whisper and Large Language Models (LLMs) to transform audio and speech into accurate transcripts. Subsequently, these transcripts will be succinctly summarized. The resulting summaries will then be systematically uploaded to an AWS cloud database, enabling efficient retrieval and search capabilities in the future.

## Table of Contents
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Code Overview](#code-overview)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Project Structure
Webpages are developed to realize all functionality: 
1. Audio to Transcript and Summary Page 
2. Speech to Text Conversion Page 
3. Summary Search Page

AI Models Whisper model and LLM model API are deployed to convert audio to transcript and make summarization.

For data management, a PostgreSQL database is deployed on the Relational Database Service (RDS) of Amazon Web Services (AWS).

## Installation
### Pre-requisites
- Python: This project is built with HTML, CSS, Javascipt, Python 3.12.3
- PostgreSQL: This project depends on PostgresSQL database to store data.

### Clone and install
- Clone the repository: `git clone git@github.com:Apache-Hell/S3.git`, `cd S3`
- Install dependencies: `pip install -r requirements.txt`.
- Install a local whisper model.
- Input Googgle AI API key.

## Usage
- Start the PostgreSQL database in RDS server.
- Start whisper web API by running `S2T.py`.
- The server is hosted on an EC2 instance running Ubuntu. 
- Since we don't have an SSL certificate, you can use this in Google Chrome by typing "chrome://flags/#unsafely-treat-insecure-origin-as-secure", in the text box enter "http://3.27.207.106:3000" and relaunch the browser. Then open our webpage using "http://3.27.207.106:3000" to launch our project.

## Code Overview
### Dependencies
- Flask: For web API
- whisper: For whisper model

## Error Handling
Error handling is implemented throughout the project, with errors being logged and, in critical cases, the process exiting with a non-zero status code.
```
