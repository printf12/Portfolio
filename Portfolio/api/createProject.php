<?php
/**
 * Returns the list of projects.
 */
require 'connect.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);

  // Sanitize.
  $image = mysqli_real_escape_string($con, trim($request->image));
  $titel  = mysqli_real_escape_string($con, trim($request->titel));
  $description  = mysqli_real_escape_string($con, trim($request->description));
  $creationDate  = mysqli_real_escape_string($con, trim($request->creationDate));
  $url  = mysqli_real_escape_string($con, trim($request->url));

  $sql = "INSERT INTO `projects` (`id`,`titel`, `description`, `image`, `creationDate`, `url`) VALUES (null, '{$titel}', '{$description}', '{$image}', '{$creationDate}', '{$url}')";

  if(mysqli_query($con,$sql))
  {
    http_response_code(201);
    $project = [
      'titel' => $titel,
      'description' => $description,
      'image' => $image,
      'creationDate' => $creationDate,
      'url' => $url,
      'id'    => mysqli_insert_id($con)
    ];
    echo json_encode($project);
  }
  else
  {
    http_response_code(422);
  }
}



