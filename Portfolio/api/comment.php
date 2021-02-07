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
  $email = mysqli_real_escape_string($con, trim($request->email));
  $commentText  = mysqli_real_escape_string($con, trim($request->commentText));
  $commentedAt  = mysqli_real_escape_string($con, trim($request->commentedAt));
  $commentedBy  = mysqli_real_escape_string($con, trim($request->commentedBy));
  $blogID = mysqli_real_escape_string($con, (int)$request->blogID);

  $sql = "INSERT INTO `comments` (`id`,`email`, `commentText`, `commentedAt`, `commentedBy`, `blogID` ) VALUES (null, '{$email}', '{$commentText}', '{$commentedAt}', '{$commentedBy}', '{$blogID}')";

  if(mysqli_query($con,$sql))
  {
    http_response_code(201);
    $comment = [
      'email' => $email,
      'commentText' => $commentText,
      'commentedAt' => $commentedAt,
      'commentedBy' => $commentedBy,
      'blogID' => $blogID,
      'id'    => mysqli_insert_id($con)
    ];
    echo json_encode($comment);
  }
  else
  {
    http_response_code(422);
  }
}


