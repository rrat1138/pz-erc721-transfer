<?php

// Set the request URL
$url = "http://localhost:3000/transfer-tokens";

$data = array(
   "contractAddress" => "0x51de5eeB225a1e392F5EaCD4898FF83b38c342f1",
    "recipientAddress" => "0x8a936dd11171C554A19308662DAfF04E8CDF61C0",
    "tokenAmount" => 10,
    "tokenMetadata1" => json_encode([
    "name" => "My Token Name",
    "description" => "My Token Description"
]),
);

// Encode the data as JSON
$json_data = json_encode($data);

error_log($json_data);


// Set the cURL options
$options = array(
    CURLOPT_URL => $url,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => $json_data,
    CURLOPT_HTTPHEADER => array(
        "Content-Type: application/json",
        "Content-Length: " . strlen($json_data)
    )
);



// Initialize cURL
$curl = curl_init();

// Set the cURL options
curl_setopt_array($curl, $options);

// Execute the cURL request
$response = curl_exec($curl);

// Check for errors
if (curl_errno($curl)) {
    $error_msg = curl_error($curl);
    echo "Error: $error_msg\n";
}

// Close the cURL session
curl_close($curl);

// Print the response
echo $response;

// Print the contents of the cccarray
echo "<pre>";
print_r($data);
echo "</pre>";

?>
