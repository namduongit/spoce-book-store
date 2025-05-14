export function showLoading() {
  document.getElementById("loading-overlay").style.display = "flex";
}

export function hideLoading() {
  document.getElementById("loading-overlay").style.display = "none";
}

window.showLoading = showLoading;
window.hideLoading = hideLoading;
