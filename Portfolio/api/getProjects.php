<?php
/**
 * Returns the list of projects.
 */
require 'connect.php';
    
$projects = [];
$sql = "SELECT * FROM projects";


if($result = mysqli_query($con,$sql))
{
  $cr = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $projects[$cr]['id'] = $row['id'];
    $projects[$cr]['description'] = $row['description'];
    $projects[$cr]['image'] = $row['image'];
    $projects[$cr]['title'] = $row['titel'];
    $projects[$cr]['creationDate'] = $row['creationDate'];
    $cr++;
  }
    
  echo json_encode(['data'=>$projects]);
}
else
{
  http_response_code(404);
}


