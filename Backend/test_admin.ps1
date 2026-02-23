$response = Invoke-RestMethod -Uri http://localhost:8000/api/auth/login -Method Post -ContentType "application/json" -Body '{"email":"admin@admin.com","password":"admin123"}'
$token = $response.access_token
$headers = @{ Authorization = "Bearer $token" }

Write-Host "--- STATS ---"
$stats = Invoke-RestMethod -Uri http://localhost:8000/api/admin/stats -Method Get -Headers $headers
$stats | ConvertTo-Json -Depth 2

Write-Host "--- USERS ---"
$users = Invoke-RestMethod -Uri http://localhost:8000/api/admin/users -Method Get -Headers $headers
Write-Host "Found $($users.Count) users."
if ($users.Count -gt 0) {
    $users[0] | ConvertTo-Json -Depth 2
}
