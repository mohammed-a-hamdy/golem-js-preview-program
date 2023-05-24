# Golem JS Preview Program Feedback Form

## Introduction
Thank you for taking the time to complete this Golem JS Preview Program task! 
We appreciate your effort in helping us gather valuable feedback and suggestions on how to improve the Golem Network. 
Please fill out the following form to provide your feedback and estimated completion times for each task step.

## Task: #3 - Parallel File Conversion

### Estimated completion time:
| Task Step                                                                           | Completion Time (in minutes) |
|-------------------------------------------------------------------------------------|------------------------------|
| Convert the docker image to a GVMI image and publish it to receive an image hash    |               200            |
| Schedule a task on Golem with image conversion from Node.js context                 |               75             |
| [Challenge] Schedule a task on Golem with image conversion from the browser context |               200            |

### Feedback:
Please provide any feedback you have regarding each task step below:

#### Step 1: Convert the docker image to a GVMI image and publish it to receive an image hash

- Despite following the official step-by-step online tutorial, I faced significant difficulties while using the gvmkit-build tool.
- Multiple unexpected errors were encountered during the process, suggesting a possible dependency issue with pip and the request_chunked function.
- After updating the gvmkit-build package to version 0.2.2, I was able to successfully run and convert certain Docker images.
- However, there was a consistent conflict with a package called 'prekucki/squashfs-tools:latest' in the local Docker repository. It would get installed automatically with every use of the conversion tool, requiring manual deletion for the tool to function properly.
- Additionally, there was an issue with converting images larger than 500 MB in size. The conversion process would consistently freeze at 3% and eventually return a timeout error.
- Nonetheless I'm truly amazed by the significant reduction in size of the Docker image when converted to a Golem Image. The size reduction reached nearly 65%, which is an impressive level of efficiency and speed.

#### Step 2: Schedule a task on Golem with image conversion from Node.js context 
My experience creating the parallel conversion task was excellent. The log process and methods provided by the Executor API were remarkably user-friendly and easy to understand. I encountered no issues throughout the execution of the task. My familiarity with the core API made working with the Executor API a breeze.

#### Step 3: [Challenge] Schedule a task on Golem with image conversion from the browser context
Using a web interface can feel strange at times. While GUIs are necessary for specific tasks, the main focus here is on developers, right? Creating HTML files and associated JavaScript code to run the script, as well as working with the bundled library yajsapi.min.js with module support, has been quite cumbersome.

## General feedback:
The website, https://preview.golem.network/, is truly impressive, offering a modern and user-friendly UI/UX experience. The smooth design and user-oriented approach are commendable. However, I have one comment regarding the Terms & Conditions agreement. Currently, it redirects to Google Docs, but it would be preferable if the agreement were integrated into the site itself to maintain design consistency. Additionally, it would be valuable to incorporate accessibility options for individuals with hearing or visual impairments, further enhancing the outstanding user experience already provided.


### Suggestions for Improvement
The API documentation provided at https://docs.golem.network/creators/javascript/docs/ is currently in an early stage and requires further clarification. Unfortunately, a significant portion of the API documents are inaccessible, leading to '404 - Not found' errors. This makes it challenging for users to navigate through the documentation and accomplish even simple tasks. To improve usability, it would be beneficial to adopt a more modern approach, such as providing tutorials for each task and comprehensive explanations on how to use various options and functions. This would greatly enhance the user experience and facilitate a better understanding of the API capabilities.

The Executor API is exceptionally user-friendly, providing excellent starter capabilities with potential for further improvement. However, the absence of mid-level API documentation and lack of guidance is noticeable. Including constructive examples on how to utilize the middle API would greatly assist users in harnessing its features effectively.

The mid level API documentation is abset and no guidance whatsover is provided, with no examples, please add more constructive examples on how to use the middle api.

Thank you for your feedback and for contributing to the Golem Network!
