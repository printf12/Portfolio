<?php

require 'connect.php';
    
$projects = [];

$projectCount = (int)file_get_contents("php://input");

$sql = "SELECT * FROM projects LIMIT $projectCount";



if($result = mysqli_query($con,$sql))
{
  $cr = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $projects[$cr]['id'] = $row['id'];
    $projects[$cr]['description'] = $row['description'];
    $projects[$cr]['image'] = $row['image'];
    $projects[$cr]['titel'] = $row['titel'];
    $projects[$cr]['creationDate'] = $row['creationDate'];
    $cr++;
  }
    
  echo json_encode(['data'=>$projects]);
}
else
{
  http_response_code(404);
}


