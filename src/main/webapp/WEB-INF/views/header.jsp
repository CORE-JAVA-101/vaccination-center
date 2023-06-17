<%
String baseUrl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath();
%>
<%= baseUrl %>

<br>
<script src="<%= baseUrl %>/script.js"></script>

<input type="hidden" id="baseUrl" value="<%= baseUrl %>"/>
<style>
    /* Custom styles for the dark navbar */
    .navbar-dark {
      background-color: #333; /* Customize the background color */
      color: #fff; /* Customize the text color */
    }
  </style>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="<%= baseUrl %>/citizens">Citizens</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="<%= baseUrl %>/vaccinationcenter">Vaccination Centers</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Logout</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Welcome, Admin</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
