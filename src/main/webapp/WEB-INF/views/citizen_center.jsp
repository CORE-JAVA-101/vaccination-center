<!DOCTYPE html>
<html>

<head>
    <title>Citizens</title>

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
</head>

<body>
    <div class="container">

        <%@ include file="header.jsp" %>
            <input type="hidden" id="centerId" value="${id}">
            <div id="citizenEdit">
                <h2>Edit Citizen</h2>

                <form id="citizenEditForm" onsubmit="citizenEditForm(event)">
                    <input type="hidden" id="citizenId">
                    <div class="form-group">
                        <label for="name">Name:</label>
                        <input type="text" class="form-control" id="citizenName" required>
                    </div>
                    <div class="form-group">
                        <label for="city">City:</label>
                        <input type="text" class="form-control" id="citizenCity" required>
                    </div>
                    <div class="form-group">
                        <label for="count">Vaccination Count:</label>
                        <input type="text" class="form-control" id="vaccinationCount" required>
                    </div>
                    <div class="form-group">
                        <label for="status">Status:</label>
                        <label class="form-control" id="vaccinationStatus" required>
                    </div>
                    <div class="form-group">
                        <label for="gender">Vaccination Centers:</label>
                        <select class="form-control" id="center" required>
                            <option value="">Select Center</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>

                </form>
            </div>
            <div id="citizenView">
                <h2> View Citizen</h2>
                <div id="oneCitizen"></div>
            </div>

            <div id="citizenDetails">
                <h2>Citizen Details</h2>
                <table id="citizensTable" class="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>City</th>
                            <th>Dose Count</th>
                            <th>Vaccination Status</th>
                            <th>Vaccination Center</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>

            </div>
    </div>

</body>

<script>
    window.onload = function (event) {
        display("citizenView", "none");
        display("citizenDetails", "block");
        display("citizenEdit", "none");
        let id = document.getElementById("centerId").value;
        console.log(id);
        citizenListByUrl(getBaseUrl() + "/citizens/center/" + id, deleteCallback);
    }

    function deleteCallback(event)
    {
      citizenApi.delete(event.target.id,redirectCallback);
    }

    function redirectCallback()
    {
        let id = document.getElementById("centerId").value;
        window.location.href = getBaseUrl() + "/citizens/center/"+value
    }
</script>

</html>