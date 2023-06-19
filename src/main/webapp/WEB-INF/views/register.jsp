<!DOCTYPE html>
<html>
<head>
  <title>Registration Page</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
  <script>
    function submitForm() {
      const form = document.getElementById("registrationForm");
      const name = form.elements["name"].value;
      const email = form.elements["email"].value;
      const password = form.elements["password"].value;

      // Prepare the form data
      const payload={
        name:name,
        email: email,
        password: password
      }

      // Submit the form data using Fetch API
      fetch("/registration", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json', 
          'Accept': 'application/json' 
        }
      })
      .then(response =>{
        if(response.ok){  
        onActionMessage(`<div class="alert alert-success" role="alert">Registration Success.</div>`)
        return response.json();
        }
        console.log(response);
        throw new Error('Error While registration: ');
      })
      .then(data => {
        // Handle the response from the server
        console.log(data);

      })
      .catch(error => {
        // Handle any errors
        console.error(error);
        onActionMessage(`<div class="alert alert-warning" role="alert">Registration Failed. Try again!!</div>`)
        // alert('Registration Failed');
      });
    }

    
    function onActionMessage(content)
            {
                let errorMessage = content;
                            let messageListElement = document.getElementById('messageList');
                            messageListElement.innerHTML = errorMessage;

                            setTimeout(()=>{
                                messageListElement.innerHTML ='';
                            }, 2000)
            }

  </script>
</head>
<body>

   <%@ include file="base.jsp" %>
  <div class="container">
    <h2>Registration Page</h2>
    <form id="registrationForm">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" class="form-control" id="name" name="name" required>
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" class="form-control" id="email" name="email" required>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" class="form-control" id="password" name="password" required>
      </div>
      <button type="button" class="btn btn-primary" onclick="submitForm()">Register</button>

      <div id="messageList"></div>
      <p>Already have an account? <a href="/">Login</a></p>
    </form>
  </div>
</body>
</html>
