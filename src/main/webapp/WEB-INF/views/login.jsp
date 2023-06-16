<!-- login.jsp -->

<!DOCTYPE html>
<html>
<head>
    <title>Login Page</title>
    <!-- Include Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
</head>
<body>
    <div class="container">
        <div class="row justify-content-center mt-5">
            <div class="col-md-4">
                <h2 class="text-center">Login</h2>
                <form id="loginForm">
                    <div class="form-group">
                        <label for="username">Username:</label>
                        <input type="text" class="form-control" id="username" name="username" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Password:</label>
                        <input type="password" class="form-control" id="password" name="password" required>
                    </div>
                    <div class="text-center">
                        <button type="submit" class="btn btn-success">Login</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Include JavaScript -->
    <script>
        document.getElementById("loginForm").addEventListener("submit", function(event) {
            event.preventDefault(); // Prevent form submission

            // Fetch POST request to /authenticate
            fetch("/authenticate", {
                method: "POST",
                body: new FormData(event.target)
            })
            .then(function(response) {
                if (response.ok) {
                    // Redirect to a success page or perform further actions
                    window.location.href = "/success";
                } else {
                    // Display an error message
                    alert("Login failed. Please try again.");
                }
            })
            .catch(function(error) {
                // Handle network or server errors
                console.error("Error:", error);
            });
        });
    </script>
</body>
</html>
