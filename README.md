DATA472 - Group Project: Speech to Text

### 1. Introduction
This project aims to harness the capabilities of Whisper and Large Language Models (LLMs) to transform audio and speech into accurate transcripts. Subsequently, these transcripts will be succinctly summarized. The resulting summaries will then be systematically uploaded to an AWS cloud database, enabling efficient retrieval and search capabilities in the future.

### 2. Project Structure
1. Webpages are developed to realize all functionality:
i) Audio to Transcript and Summary Page
ii) Speech to Text Conversion Page
iii) Summary Search Page

2. AI Models
Whisper model and LLM model API are deployed to convert audio to transcript and make summarization.

4. Data Management
For data management, a PostgreSQL database is deployed on the Relational Database Service (RDS) of Amazon Web Services (AWS). 

### 3. Installation
Pre-requisites
Python: This project is built with HTML, CSS, Javascipt, Python 3.12.3
PostgreSQL: This project depends on PostgresSQL database to store data.
Clone and install
Clone the repository: git clone git@github.com:Apache-Hell/S3.git, cd S3
Install dependencies: pip install -r requirements.txt.
Install a local whisper model.
Input Googgle AI API key.
Usage
Start the PostgreSQL database in RDS server.
Start whisper web API by running S2T.py.


### 4. Code Overview
Dependencies 
Flask: For web API 
whisper: For whisper model


### 5. Logging
The project uses Logging for logging. Logs are written to the log file of ETL.log in the log directory.

### 6. Scheduled Task
No scheduled task.

### 7. Error Handling
Error handling is implemented throughout the project, with errors being logged and, in critical cases, the process exiting with a non-zero status code.
