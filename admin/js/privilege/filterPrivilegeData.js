export async function lockRole(privilegeId, status) {
    let formData = new URLSearchParams();
    formData.append('id', privilegeId);
    formData.append('status', status);
    let response = await fetch('api/privileges/lock.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData.toString()
    });

    if (!response.ok) {
        throw new Error("Lỗi khi lấy dữ liệu! HTTP Status: " + response.status);
    }
    let responseJSON = await response.json();
    return responseJSON;
}

export async function updateRole(privilegeId, rolePrivilege) {
    
}
