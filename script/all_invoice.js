const resultCount = document.getElementById("invoiceResultCount");

// Function to get invoices from localStorage
function getInvoicesFromStorage() {
  try {
    const invoices = JSON.parse(localStorage.getItem("savedInvoices") || "[]");

    // Filter out expired invoices (older than 1 month)
    const now = new Date();
    const validInvoices = invoices.filter((invoice) => {
      const invoiceDate = new Date(invoice.date || invoice.createdAt);
      const expiryDate = new Date(invoiceDate);
      expiryDate.setMonth(expiryDate.getMonth() + 1);

      // Keep invoices that haven't expired yet
      return expiryDate > now;
    });

    // If any invoices were removed, update localStorage
    if (validInvoices.length !== invoices.length) {
      localStorage.setItem("savedInvoices", JSON.stringify(validInvoices));
      console.log(
        `Removed ${invoices.length - validInvoices.length} expired invoice(s)`
      );
    }

    return validInvoices;
  } catch (error) {
    console.error("Error reading invoices:", error);
    return [];
  }
}

// Function to perform filtering and update results
function updateFilterResults() {
  const search = document
    .getElementById("invoiceSearch")
    .value.trim()
    .toLowerCase();
  const allInvoices = getInvoicesFromStorage();

  // Filter invoices by buyer name
  let filteredInvoices = allInvoices;
  if (search) {
    filteredInvoices = allInvoices.filter((invoice) => {
      const buyerName = (
        invoice.buyerName ||
        invoice.buyerInfo?.name ||
        ""
      ).toLowerCase();
      return buyerName.includes(search);
    });
  }

  const count = filteredInvoices.length;

  // Update result text
  let outputText = "All Invoices";
  if (search) {
    outputText += ` matching Client Name: "${
      document.getElementById("invoiceSearch").value
    }"`;
  }

  resultCount.textContent = `${outputText} (${count} total)`;

  // Display invoices list
  displayInvoices(filteredInvoices);

  // Remove previous success messages if they exist
  const existingSuccessDiv = document.querySelector(".success-message");
  if (existingSuccessDiv) {
    existingSuccessDiv.remove();
  }
}

// Function to display invoices
function displayInvoices(invoices) {
  const invoicesList = document.getElementById("invoicesList");

  if (invoices.length === 0) {
    invoicesList.innerHTML =
      '<p class="text-gray-500 text-center py-8">No invoices found</p>';
    return;
  }

  invoicesList.innerHTML = invoices
    .map((invoice, index) => {
      const date = new Date(invoice.date || invoice.createdAt);
      const dateStr = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

      // Calculate expiry date (1 month after invoice date)
      const expiryDate = new Date(date);
      expiryDate.setMonth(expiryDate.getMonth() + 1);
      const expiryDateStr = expiryDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

      const buyerName =
        invoice.buyerName || invoice.buyerInfo?.name || "Unknown Customer";
      const total = invoice.total || 0;
      const itemCount = invoice.itemCount || invoice.items?.length || 0;

      return `
                        <div class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div class="flex justify-between items-start gap-4">
                                <div class="flex-1">
                                    <div class="flex items-center gap-2 mb-2">
                                        <span class="text-sm text-gray-500">${dateStr}</span>
                                        <span class="text-xs text-red-600 font-semibold">• Expires: ${expiryDateStr}</span>
                                    </div>
                                    <h3 class="text-lg font-semibold text-gray-900 mb-1">
                                        👤 ${buyerName}
                                    </h3>
                                    <div class="text-sm text-gray-600">
                                        <p>📦 ${itemCount} item${
        itemCount !== 1 ? "s" : ""
      }</p>
                                        ${
                                          invoice.buyerInfo?.phone
                                            ? `<p>📞 ${invoice.buyerInfo.phone}</p>`
                                            : ""
                                        }
                                        ${
                                          invoice.buyerInfo?.location
                                            ? `<p>📍 ${invoice.buyerInfo.location}</p>`
                                            : ""
                                        }
                                    </div>
                                </div>
                                <div class="text-right flex flex-col items-end gap-2">
                                    <div class="text-2xl font-bold text-green-600">
                                        $${total.toFixed(2)}
                                    </div>
                                    <div class="flex gap-2">
                                        <button onclick="viewInvoice('${
                                          invoice.id
                                        }')" class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg font-semibold transition-all shadow-sm hover:shadow-md text-sm">
                                            👁️ Check
                                        </button>
                                        <button onclick="deleteInvoice('${
                                          invoice.id
                                        }')" class="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg font-semibold transition-all shadow-sm hover:shadow-md text-sm">
                                            🗑️ Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
    })
    .join("");
}

// Function to view invoice details
function viewInvoice(invoiceId) {
  const invoices = getInvoicesFromStorage();
  const invoice = invoices.find((inv) => inv.id === invoiceId);

  if (!invoice) {
    alert("Invoice not found!");
    return;
  }

  // Display invoice in modal
  displayInvoiceModal(invoice);
}

// Function to display invoice details in modal
function displayInvoiceModal(invoice) {
  const modal = document.getElementById("invoiceModal");
  const modalBody = document.getElementById("modalBody");
  const modalTitle = document.getElementById("modalTitle");

  const date = new Date(invoice.date || invoice.createdAt);
  const dateStr = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const buyerName =
    invoice.buyerName || invoice.buyerInfo?.name || "Unknown Customer";

  modalTitle.textContent = `Invoice Details`;

  // Build items table
  let itemsHTML = "";
  if (invoice.items && invoice.items.length > 0) {
    itemsHTML = `
                        <table class="w-full border-collapse">
                            <thead>
                                <tr class="bg-gray-100">
                                    <th class="border border-gray-300 px-4 py-2 text-left">Product Name</th>
                                    <th class="border border-gray-300 px-4 py-2 text-center">Qty</th>
                                    <th class="border border-gray-300 px-4 py-2 text-right">Price</th>
                                    <th class="border border-gray-300 px-4 py-2 text-right">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${invoice.items
                                  .map(
                                    (item) => `
                                    <tr>
                                        <td class="border border-gray-300 px-4 py-2">${
                                          item.name || item.description
                                        }</td>
                                        <td class="border border-gray-300 px-4 py-2 text-center">${
                                          item.quantity
                                        }</td>
                                        <td class="border border-gray-300 px-4 py-2 text-right">$${item.price.toFixed(
                                          2
                                        )}</td>
                                        <td class="border border-gray-300 px-4 py-2 text-right">$${item.total.toFixed(
                                          2
                                        )}</td>
                                    </tr>
                                `
                                  )
                                  .join("")}
                            </tbody>
                        </table>
                    `;
  }

  modalBody.innerHTML = `
                    <div class="space-y-4">
                        <!-- Invoice Info -->
                        <div class="pb-4 border-b">
                            <div>
                                <p class="text-sm text-gray-500">Date</p>
                                <p class="font-semibold text-lg">${dateStr}</p>
                            </div>
                        </div>
                        
                        <!-- Customer Info -->
                        <div class="pb-4 border-b">
                            <h3 class="font-bold text-lg mb-3">Customer Information</h3>
                            <div class="grid grid-cols-1 gap-2">
                                <div>
                                    <p class="text-sm text-gray-500">Name</p>
                                    <p class="font-semibold">👤 ${buyerName}</p>
                                </div>
                                ${
                                  invoice.buyerInfo?.phone
                                    ? `
                                    <div>
                                        <p class="text-sm text-gray-500">Phone</p>
                                        <p class="font-semibold">📞 ${invoice.buyerInfo.phone}</p>
                                    </div>
                                `
                                    : ""
                                }
                                ${
                                  invoice.buyerInfo?.location
                                    ? `
                                    <div>
                                        <p class="text-sm text-gray-500">Location</p>
                                        <p class="font-semibold">📍 ${invoice.buyerInfo.location}</p>
                                    </div>
                                `
                                    : ""
                                }
                            </div>
                        </div>
                        
                        <!-- Items -->
                        <div class="pb-4 border-b">
                            <h3 class="font-bold text-lg mb-3">Items (${
                              invoice.items?.length || 0
                            })</h3>
                            ${itemsHTML}
                        </div>
                        
                        <!-- Totals -->
                        <div class="space-y-2">
                            <div class="flex justify-between text-lg">
                                <span>Subtotal:</span>
                                <span class="font-semibold">$${(
                                  invoice.subtotal || 0
                                ).toFixed(2)}</span>
                            </div>
                            ${
                              invoice.deliveryFee
                                ? `
                                <div class="flex justify-between text-lg">
                                    <span>Delivery Fee:</span>
                                    <span class="font-semibold">$${invoice.deliveryFee.toFixed(
                                      2
                                    )}</span>
                                </div>
                            `
                                : ""
                            }
                            <div class="flex justify-between text-2xl font-bold text-green-600 pt-2 border-t-2">
                                <span>Total:</span>
                                <span>$${(invoice.total || 0).toFixed(2)}</span>
                            </div>
                        </div>
                        
                        <!-- Action Buttons -->
                        <div class="flex gap-3 pt-4 border-t">
                            <button onclick="openInvoiceInMainPage('${
                              invoice.id
                            }')" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold transition-all">
                                📄 Open in Invoice Page
                            </button>
                            <button onclick="closeInvoiceModal()" class="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-3 rounded-lg font-semibold transition-all">
                                Close
                            </button>
                        </div>
                    </div>
                `;

  modal.style.display = "block";
}

// Function to close modal
function closeInvoiceModal() {
  document.getElementById("invoiceModal").style.display = "none";
}

// Function to delete invoice
function deleteInvoice(invoiceId) {
  if (!confirm('Are you sure you want to delete this invoice? This action cannot be undone.')) {
    return;
  }
  
  try {
    let savedInvoices = JSON.parse(localStorage.getItem('savedInvoices') || '[]');
    const initialLength = savedInvoices.length;
    savedInvoices = savedInvoices.filter(inv => inv.id !== invoiceId);
    
    if (savedInvoices.length === initialLength) {
      alert('Invoice not found!');
      return;
    }
    
    localStorage.setItem('savedInvoices', JSON.stringify(savedInvoices));
    updateFilterResults();
    
    // Show success message
    const formContainer = document.querySelector('.max-w-2xl');
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm';
    successDiv.textContent = 'Invoice deleted successfully!';
    formContainer.appendChild(successDiv);
    
    setTimeout(() => {
      successDiv.remove();
    }, 2000);
  } catch (error) {
    console.error('Error deleting invoice:', error);
    alert('Error deleting invoice. Please try again.');
  }
}

// Function to open invoice in main page
function openInvoiceInMainPage(invoiceId) {
  sessionStorage.setItem("viewInvoiceId", invoiceId);
  sessionStorage.setItem("skipLoginRedirect", "true");
  window.location.href = "index.html";
}

// Close modal when clicking outside
window.onclick = function (event) {
  const modal = document.getElementById("invoiceModal");
  if (event.target == modal) {
    closeInvoiceModal();
  }
};

// Initial call to set the count
updateFilterResults();

// Listen for input changes in the search box to trigger filtering
document
  .getElementById("invoiceSearch")
  .addEventListener("input", updateFilterResults);

// Listen for localStorage changes from other tabs/windows
window.addEventListener("storage", function (e) {
  if (e.key === "savedInvoices") {
    updateFilterResults();
  }
});

// Refresh data every 2 seconds to catch changes from same tab
setInterval(updateFilterResults, 2000);

// The form submission handler is kept to prevent default behavior if the user hits Enter
document
  .getElementById("invoiceFilterForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    updateFilterResults();

    // Show a temporary message indicating filter action
    const formContainer = document.querySelector(".max-w-2xl");
    const successDiv = document.createElement("div");
    successDiv.className =
      "success-message mt-4 p-3 bg-blue-100 border border-blue-400 text-blue-700 rounded-lg text-sm";
    successDiv.textContent = "Searching client invoices...";
    formContainer.appendChild(successDiv);

    setTimeout(() => {
      successDiv.remove();
    }, 1500);
  });
