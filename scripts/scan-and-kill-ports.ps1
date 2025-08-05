Write-Host ""
Write-Host "Scanning ports 8080-8084..."

for ($port = 8080; $port -le 8084; $port++) {
    $connections = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue

    if ($connections) {
        $procIds = $connections | Select-Object -ExpandProperty OwningProcess -Unique

        foreach ($procId in $procIds) {
            try {
                $proc = Get-Process -Id $procId -ErrorAction Stop
                Write-Host ""
                Write-Host "Port $port is in use by PID $procId ($($proc.ProcessName))"

                $confirm = Read-Host "Do you want to kill this process? (y/n)"
                if ($confirm -eq 'y') {
                    Stop-Process -Id $procId -Force
                    Write-Host "Process $procId ($($proc.ProcessName)) killed."
                } else {
                    Write-Host "Skipped killing process $procId."
                }
            } catch {
                Write-Host "Could not access process $procId."
            }
        }
    } else {
        Write-Host "Port $port is free."
    }
}

Write-Host ""
Write-Host "Done."
