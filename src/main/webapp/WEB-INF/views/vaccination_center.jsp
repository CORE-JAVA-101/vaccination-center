<!DOCTYPE html>
<html>

<head>
  <title>Vaccination Center Form</title>
  <!-- Add Bootstrap CSS -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
</head>

<body>

  <div class="container">
    <%@ include file="header.jsp" %>

    <div id="centers">
      <button type="button" onclick="_newCenter(event)" class="btn btn-primary">Add New Center</button>

      <h2>Vaccination Centers</h2>
      <table id="centerTable" class="table">
          <thead>
              <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>City</th>
                  <th>Action</th>
              </tr>
          </thead>
          <tbody></tbody>
      </table>

      <div id="countRow"></div>
  </div>

  <div id="centerForm">
  <h2 class="text-center">Vaccination Center Form</h2>
        <form id="centerForm" >
          <input type="hidden" id="centerId">
          <div class="form-group">
            <label for="centerName">Center Name:</label>
            <input type="text" class="form-control" id="centerName" required>
          </div>
          <div class="form-group">
            <label for="centerCity">Center City:</label>
            <select class="form-control" id="centerCity" required>
              <option value="1">City 1</option>
              <option value="2">City 2</option>
              <option value="3">City 3</option>
              <!-- Add more city options as needed -->
            </select>

          </div>
          <button type="button" onclick="centerFormAdd(event)" class="btn btn-primary">Submit</button>
         <br>
         <span id="errorList"></span>

        </form>
  </div>
  </div>

  <!-- Add Bootstrap JS and your custom script -->

  <script>
    // Submit form using JavaScript fetch API
  window.onload=function(event)
  {
    display('centerForm','none');
    vaccinationCenters(); 
  }
  </script>

</body>

</html>