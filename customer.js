// --- Global Variables (State) ---
        let customers = [];
        let isLoading = false;
        let currentFeedback = null;

        // --- Utility Functions ---

        /**
         * Load customers from localStorage
         */
        const loadCustomersFromStorage = () => {
            try {
                const stored = localStorage.getItem('savedCustomers');
                customers = stored ? JSON.parse(stored) : [];
                return customers;
            } catch (error) {
                console.error('Error loading customers:', error);
                return [];
            }
        };

        /**
         * Save customers to localStorage
         */
        const saveCustomersToStorage = () => {
            try {
                const dataString = JSON.stringify(customers);
                localStorage.setItem('savedCustomers', dataString);
                console.log(`Successfully saved ${customers.length} customers to localStorage (${dataString.length} bytes)`);
                return true;
            } catch (error) {
                console.error('Error saving customers to localStorage:', error);
                if (error.name === 'QuotaExceededError') {
                    console.error('localStorage quota exceeded. Try clearing old data or reducing the amount of data to store.');
                }
                return false;
            }
        };

        /**
         * Sets and displays a temporary feedback message (toast).
         */
        const setFeedback = (type, message) => {
            currentFeedback = { type, message };
            renderFeedbackToast();
            setTimeout(() => {
                currentFeedback = null;
                renderFeedbackToast();
            }, 5000);
        };

        /**
         * Updates the loading state and disables/enables primary action buttons.
         */
        const setIsLoadingState = (loading) => {
            isLoading = loading;
            const saveBtn = document.getElementById('save-button');
            const exportBtn = document.getElementById('export-button');
            const importBtn = document.getElementById('import-trigger');
            const clearBtn = document.getElementById('clear-trigger');

            const buttons = [saveBtn, exportBtn, importBtn, clearBtn];
            
            buttons.forEach(btn => {
                if (btn) btn.disabled = loading;
            });
            
            if (saveBtn) {
                saveBtn.innerHTML = loading 
                    ? `<svg class="animate-spin h-5 w-5 text-white mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                       </svg> Saving...`
                    : `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8 7H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4v6m-3-3h6M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
                       </svg> Save Current Customer`;
            }
            if (clearBtn && !loading) {
                clearBtn.disabled = customers.length === 0;
            }
            if (exportBtn && !loading) {
                 exportBtn.disabled = customers.length === 0;
            }
        };

        // --- Rendering Functions ---

        /**
         * Renders a loading state for the customer table
         */
        const renderLoadingState = () => {
            const container = document.getElementById('customer-table-container');
            container.innerHTML = `
                <div class="p-6 text-center">
                    <svg class="animate-spin h-8 w-8 text-indigo-600 mx-auto mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p class="text-gray-600 font-medium">Initializing database...</p>
                </div>
            `;
        };

        /**
         * Renders the customer data table based on the global 'customers' array.
         */
        const renderCustomerTable = () => {
            const container = document.getElementById('customer-table-container');
            const countDisplay = document.getElementById('customer-count');
            
            countDisplay.innerHTML = `Total Customers: <span class="text-indigo-600 font-extrabold">${customers.length}</span>`;

            if (customers.length === 0) {
                container.innerHTML = '<p class="p-6 text-gray-500 italic">No customers registered yet. Start adding one!</p>';
                return;
            }

            const tableHtml = `
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Phone Number</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Registered</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        ${customers.map((customer, index) => `
                            <tr class="${index % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100 transition duration-150'}">
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${customer.name || '(N/A)'}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">${customer.phone || '-'}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${customer.location || '-'}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-400 hidden lg:table-cell">${customer.registeredDate}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div class="flex gap-2">
                                        <button onclick="handleEditCustomer('${customer.id}')" 
                                            class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-150 text-xs font-medium"
                                            title="Edit customer">
                                            ✏️ Edit
                                        </button>
                                        <button onclick="handleDeleteCustomer('${customer.id}')" 
                                            class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-150 text-xs font-medium"
                                            title="Delete customer">
                                            🗑️ Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
            container.innerHTML = tableHtml;
            setIsLoadingState(false); // Update button states based on new data count
        };

        /**
         * Renders the feedback toast if currentFeedback is set.
         */
        const renderFeedbackToast = () => {
            const container = document.getElementById('toast-container');
            container.innerHTML = '';
            
            if (!currentFeedback) return;

            const colorMap = {
                success: 'bg-green-500',
                error: 'bg-red-600',
                warning: 'bg-yellow-500',
            };
            const color = colorMap[currentFeedback.type] || 'bg-gray-700';

            const toastHtml = `
                <div class="fixed bottom-4 right-4 p-4 rounded-xl shadow-2xl text-white ${color} toast-enter-active">
                    <p class="font-semibold">${currentFeedback.message}</p>
                </div>
            `;
            container.innerHTML = toastHtml;
        };

        /**
         * Renders the action confirmation/import modal.
         */
        const renderModal = (type) => {
            const container = document.getElementById('modal-container');
            container.innerHTML = '';
            
            const closeModal = () => container.innerHTML = '';

            const title = type === 'clear' ? 'Confirm Database Clear' : 'Import Customer Data';
            const description = type === 'clear' ?
                'Are you absolutely sure you want to clear ALL customer records? This action cannot be undone.' :
                'Select a JSON file containing an array of customer objects to import.';

            let content = '';
            let actionButton = '';

            if (type === 'import') {
                content = `
                    <div class="mb-6">
                        <label class="block text-sm font-medium text-gray-700 mb-2">JSON File (.json)</label>
                        <input type="file" id="import-file-input" accept=".json" 
                            class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                        />
                    </div>
                `;
                actionButton = `
                    <button onclick="document.getElementById('import-file-input').click()"
                        class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-150 flex items-center">
                        Select File
                    </button>
                `;
            } else if (type === 'clear') {
                actionButton = `
                    <button id="confirm-clear-button"
                        class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-150 flex items-center">
                        Yes, Clear All
                    </button>
                `;
            }

            const modalHtml = `
                <div class="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
                    <div class="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md transform transition-all">
                        <h3 class="text-xl font-bold text-red-600 mb-4">${title}</h3>
                        <p class="text-gray-700 mb-6">${description}</p>
                        
                        ${content}

                        <div class="flex justify-end space-x-3">
                            <button onclick="document.getElementById('modal-container').innerHTML = ''"
                                class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-150">
                                Cancel
                            </button>
                            ${actionButton}
                        </div>
                    </div>
                </div>
            `;

            container.innerHTML = modalHtml;

            // Attach dynamic listeners after rendering
            if (type === 'clear') {
                document.getElementById('confirm-clear-button').addEventListener('click', handleConfirmClear);
            }
            if (type === 'import') {
                document.getElementById('import-file-input').addEventListener('change', handleImportFile);
            }
        };

        // --- Database Action Handlers ---

        /**
         * Saves the current form data as a new customer record.
         */
        const handleSaveCustomer = async () => {
            const name = document.getElementById('input-name').value.trim();
            const phone = document.getElementById('input-phone').value.trim();
            const location = document.getElementById('input-location').value.trim();
            
            const allFieldsEmpty = !name && !phone && !location;

            if (allFieldsEmpty) {
                setFeedback('warning', 'Please fill in at least one field (Name, Phone, or Location) to save a customer entry.');
                return;
            }

            setIsLoadingState(true);
            try {
                if (window.editingCustomerId) {
                    // Update existing customer
                    const customerIndex = customers.findIndex(c => c.id === window.editingCustomerId);
                    if (customerIndex !== -1) {
                        const oldCustomer = {...customers[customerIndex]}; // Backup
                        customers[customerIndex] = {
                            ...customers[customerIndex],
                            name: name,
                            phone: phone,
                            location: location
                        };
                        
                        const saved = saveCustomersToStorage();
                        if (!saved) {
                            // Revert on failure
                            customers[customerIndex] = oldCustomer;
                            throw new Error('Failed to save to localStorage');
                        }
                        
                        setFeedback('success', `Customer "${name || 'entry'}" updated successfully!`);
                        cancelEdit();
                    }
                } else {
                    // Add new customer
                    const customerData = {
                        id: Date.now().toString(),
                        name: name, 
                        phone: phone, 
                        location: location, 
                        registeredAt: new Date().toISOString(),
                        registeredDate: new Date().toLocaleDateString()
                    };
                    customers.unshift(customerData);
                }

                const saved = saveCustomersToStorage();
                
                if (!saved) {
                    // Revert the changes if save failed
                    if (window.editingCustomerId) {
                        loadCustomersFromStorage();
                    } else {
                        customers.shift(); // Remove the customer we just added
                    }
                    throw new Error('Failed to save to localStorage');
                }

                setFeedback('success', `Customer "${name || 'entry'}" ${window.editingCustomerId ? 'updated' : 'saved'} successfully!`);
                
                if (window.editingCustomerId) {
                    cancelEdit();
                }

                // Reset form
                document.getElementById('input-name').value = '';
                document.getElementById('input-phone').value = '';
                document.getElementById('input-location').value = '';
                
                renderCustomerTable();
                renderCustomerCount();

            } catch (error) {
                console.error("Error saving customer:", error);
                const errorMessage = error.message === 'Failed to save to localStorage' 
                    ? 'Failed to save customer. Your browser storage may be full or disabled.'
                    : 'Failed to save customer: ' + (error.message || 'Unknown error');
                setFeedback('error', errorMessage);
            } finally {
                setIsLoadingState(false);
            }
        };

        /**
         * Clears all customer records from localStorage.
         */
        const handleConfirmClear = async () => {
            document.getElementById('modal-container').innerHTML = ''; // Close modal
            setIsLoadingState(true);
            
            try {
                customers = [];
                localStorage.setItem('savedCustomers', '[]');
                
                setFeedback('success', 'All customer data cleared successfully!');
                renderCustomerTable();
                renderCustomerCount();
            } catch (error) {
                console.error("Error clearing database:", error);
                setFeedback('error', 'Failed to clear database.');
            } finally {
                setIsLoadingState(false);
            }
        };

        /**
         * Exports all current customer data to the clipboard as JSON.
         */
        const handleExport = () => {
            if (customers.length === 0) {
                setFeedback('warning', 'No data to export.');
                return;
            }
            
            // Exclude Firebase internal fields (id, registeredDate, and old 'email' field)
            const dataToExport = customers.map(customer => {
                const { id, registeredDate, email, ...rest } = customer;
                return rest;
            });
            const jsonString = JSON.stringify(dataToExport, null, 2);

            try {
                // Use temporary element to copy text
                const textarea = document.createElement('textarea');
                textarea.value = jsonString;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);

                setFeedback('success', 'Customer data (JSON) copied to clipboard!');
            } catch (err) {
                console.error('Failed to copy text: ', err);
                setFeedback('error', 'Failed to copy data. See console.');
            }
        };

        /**
         * Handles editing a customer
         */
        const handleEditCustomer = (customerId) => {
            const customer = customers.find(c => c.id === customerId);
            if (!customer) return;

            // Fill the form with customer data
            document.getElementById('input-name').value = customer.name || '';
            document.getElementById('input-phone').value = customer.phone || '';
            document.getElementById('input-location').value = customer.location || '';

            // Store the ID being edited
            window.editingCustomerId = customerId;

            // Update save button text
            const saveBtn = document.getElementById('save-button');
            saveBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Update Customer
            `;
            saveBtn.style.background = 'linear-gradient(135deg, #f59e0b, #d97706)';

            // Scroll to form
            document.getElementById('customer-form-container').scrollIntoView({ behavior: 'smooth' });

            setFeedback('warning', `Editing: ${customer.name || 'Customer'}`);
        };

        /**
         * Handles deleting a customer
         */
        const handleDeleteCustomer = (customerId) => {
            const customer = customers.find(c => c.id === customerId);
            if (!customer) return;

            const modalContainer = document.getElementById('modal-container');
            const modalHtml = `
                <div class="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
                    <div class="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md transform transition-all">
                        <h3 class="text-xl font-bold text-red-600 mb-4">Delete Customer</h3>
                        <p class="text-gray-700 mb-4">Are you sure you want to delete this customer?</p>
                        <div class="bg-gray-50 p-4 rounded-lg mb-6">
                            <p class="font-semibold text-gray-900">${customer.name || 'N/A'}</p>
                            <p class="text-sm text-gray-600">${customer.phone || 'No phone'}</p>
                            <p class="text-sm text-gray-600">${customer.location || 'No location'}</p>
                        </div>
                        <div class="flex justify-end space-x-3">
                            <button onclick="document.getElementById('modal-container').innerHTML = ''"
                                class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-150">
                                Cancel
                            </button>
                            <button id="confirm-delete-button"
                                class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-150">
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            `;

            modalContainer.innerHTML = modalHtml;
            document.getElementById('confirm-delete-button').addEventListener('click', () => {
                customers = customers.filter(c => c.id !== customerId);
                saveCustomersToStorage();
                renderCustomerTable();
                renderCustomerCount();
                modalContainer.innerHTML = '';
                setFeedback('success', 'Customer deleted successfully!');
            });
        };

        /**
         * Clears all form input fields.
         */
        const clearFormInputs = () => {
            document.getElementById('input-name').value = '';
            document.getElementById('input-phone').value = '';
            document.getElementById('input-location').value = '';
            
            // If in edit mode, also cancel the edit
            if (window.editingCustomerId) {
                cancelEdit();
            } else {
                setFeedback('success', 'Form cleared successfully.');
            }
        };

        /**
         * Cancels editing mode
         */
        const cancelEdit = () => {
            window.editingCustomerId = null;
            document.getElementById('input-name').value = '';
            document.getElementById('input-phone').value = '';
            document.getElementById('input-location').value = '';

            const saveBtn = document.getElementById('save-button');
            saveBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 7H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4v6m-3-3h6M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
                </svg>
                Save Current Customer
            `;
            saveBtn.style.background = '';
        };

        /**
         * Imports customer data from a selected JSON file.
         */
        const handleImportFile = async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            document.getElementById('modal-container').innerHTML = ''; // Close modal
            
            const reader = new FileReader();
            reader.onload = async (event) => {
                try {
                    const json = JSON.parse(event.target.result);

                    if (!Array.isArray(json)) {
                        setFeedback('error', 'Invalid file format. Must be an array of customers.');
                        return;
                    }

                    setIsLoadingState(true);

                    json.forEach(customer => {
                        const importData = {
                            id: Date.now().toString() + Math.random(),
                            name: customer.name || '',
                            phone: customer.phone || '',
                            location: customer.location || '',
                            registeredAt: new Date().toISOString(),
                            registeredDate: new Date().toLocaleDateString()
                        };
                        customers.push(importData);
                    });

                    saveCustomersToStorage();
                    renderCustomerTable();
                    renderCustomerCount();

                    setFeedback('success', `Successfully imported ${json.length} customers!`);
                } catch (error) {
                    console.error("Error importing data:", error);
                    setFeedback('error', 'Failed to import data. Ensure it is valid JSON and retry.');
                } finally {
                    setIsLoadingState(false);
                }
            };
            reader.readAsText(file);
        };


        // --- Initialization and Event Binding ---

        /**
         * Updates the customer count display
         */
        const renderCustomerCount = () => {
            const countDisplay = document.getElementById('customer-count');
            countDisplay.innerHTML = `Total Customers: <span class="text-indigo-600 font-extrabold">${customers.length}</span>`;
        };

        /**
         * Initializes the app by loading customers from localStorage
         */
        const initApp = () => {
            try {
                // Show loading state
                renderLoadingState();
                setIsLoadingState(true);
                
                // Simulate initialization delay to show loading state
                setTimeout(() => {
                    loadCustomersFromStorage();
                    renderCustomerTable();
                    renderCustomerCount();
                    setIsLoadingState(false);
                    setFeedback('success', 'Database initialized successfully!');
                }, 500);
            } catch (error) {
                console.error("Initialization failed:", error);
                setFeedback('error', 'Failed to initialize database.');
                setIsLoadingState(false);
            }
        };

        /**
         * Binds all necessary DOM event listeners.
         */
        const bindEvents = () => {
            document.getElementById('save-button').addEventListener('click', handleSaveCustomer);
            document.getElementById('export-button').addEventListener('click', handleExport);
            

            document.getElementById('import-trigger').addEventListener('click', () => renderModal('import'));
        };

        window.onload = () => {
            bindEvents();
            initApp();
        };