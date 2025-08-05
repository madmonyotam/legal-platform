Write-Output "Killing processes on ports 8080-8084..."

for ($port = 8080; $port -le 8084; $port++) {
    try {
        $connections = Get-NetTCPConnection -LocalPort $port -ErrorAction Stop
        $pids = $connections | Select-Object -ExpandProperty OwningProcess -Unique

        foreach ($pid in $pids) {
            Write-Output "Killing process on port $port (PID: $pid)"
            Stop-Process -Id $pid -Force
        }
    } catch {
        Write-Output "Port $port is free or inaccessible."
    }
}

Write-Output "Done."
