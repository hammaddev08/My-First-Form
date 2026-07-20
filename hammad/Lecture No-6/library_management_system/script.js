(function () {
  const initialBooks = [
    { id: 'b1', title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '978-0-06-112008-4', status: 'Available', genre: 'Fiction' },
    { id: 'b2', title: '1984', author: 'George Orwell', isbn: '978-0-452-28423-4', status: 'Checked Out', genre: 'Fiction' },
    { id: 'b3', title: 'Pride and Prejudice', author: 'Jane Austen', isbn: '978-0-14-143951-8', status: 'Available', genre: 'Fiction' },
    { id: 'b4', title: 'The Catcher in the Rye', author: 'J.D. Salinger', isbn: '978-0-31-676948-0', status: 'Reserved', genre: 'Fiction' }
  ];

  let books = [];
  let editingBookId = null;

  const $ = id => document.getElementById(id);
  const titleInput = $('titleInput');
  const authorInput = $('authorInput');
  const isbnInput = $('isbnInput');
  const statusInput = $('statusInput');
  const genreInput = $('genreInput');
  const saveBookBtn = $('saveBookBtn');
  const cancelEditBtn = $('cancelEditBtn');
  const booksContainer = $('booksContainer');
  const emptyState = $('emptyState');
  const searchInput = $('searchInput');
  const filterStatus = $('filterStatus');
  const bookCounter = $('totalBooks');
  const authorCounter = $('totalAuthors');
  const formTitle = $('formTitle');
  const formSubtitle = $('formSubtitle');
  const saveBtnText = $('saveBtnText');
  const lastUpdated = $('lastUpdated');
  const currentDate = $('currentDate');
  const currentTime = $('currentTime');

  const escapeHtml = text => {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  };

  function generateId() {
    return 'b' + Date.now();
  }

  function updateDateTime() {
    const now = new Date();
    currentDate.textContent = now.toLocaleDateString('en-GB', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    currentTime.textContent = now.toLocaleTimeString('en-GB', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }

  function updateStats() {
    const uniqueAuthors = new Set(books.map(b => b.author)).size;
    bookCounter.textContent = books.length;
    authorCounter.textContent = uniqueAuthors;
    lastUpdated.textContent = 'Just now';
  }

  function getStatusClass(status) {
    const map = {
      'Available': 'status-available',
      'Checked Out': 'status-checked',
      'Reserved': 'status-reserved',
      'In Repair': 'status-repair'
    };
    return map[status] || 'status-available';
  }

  function getStatusIcon(status) {
    const map = {
      'Available': '<svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>',
      'Checked Out': '<svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/></svg>',
      'Reserved': '<svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/></svg>',
      'In Repair': '<svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/></svg>'
    };
    return map[status] || '';
  }

  function resetForm() {
    titleInput.value = authorInput.value = isbnInput.value = '';
    statusInput.value = 'Available';
    genreInput.value = 'Fiction';
    editingBookId = null;
    formTitle.textContent = 'Add New Volume';
    formSubtitle.textContent = 'Register a new book to the collection';
    saveBtnText.textContent = 'Register Volume';
    cancelEditBtn.hidden = true;
    document.querySelectorAll('.book-card').forEach(el => el.classList.remove('editing'));
  }

  function enterEditMode(book) {
    titleInput.value = book.title;
    authorInput.value = book.author;
    isbnInput.value = book.isbn;
    statusInput.value = book.status;
    genreInput.value = book.genre;
    editingBookId = book.id;
    formTitle.textContent = 'Edit Volume';
    formSubtitle.textContent = 'Update book information';
    saveBtnText.textContent = 'Update Volume';
    cancelEditBtn.hidden = false;
    
    document.querySelectorAll('.book-card').forEach(el => el.classList.remove('editing'));
    const item = document.querySelector(`[data-book-id="${book.id}"]`);
    if (item) item.classList.add('editing');
    
    titleInput.focus();
  }

  function filterBooks() {
    const query = searchInput.value.toLowerCase().trim();
    const statusFilter = filterStatus.value;
    
    let filtered = books;
    
    if (query) {
      filtered = filtered.filter(b => 
        b.title.toLowerCase().includes(query) ||
        b.author.toLowerCase().includes(query) ||
        b.isbn.includes(query)
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(b => b.status === statusFilter);
    }
    
    renderBooks(filtered);
  }

  function renderBooks(booksToRender = books) {
    if (!booksContainer) return;

    if (booksToRender.length === 0) {
      booksContainer.innerHTML = '';
      emptyState.classList.remove('hidden');
      return;
    }

    emptyState.classList.add('hidden');

    booksContainer.innerHTML = booksToRender.map(book => `
      <div class="book-card bg-[#0d141c] border border-[#2a3544] rounded-xl p-5 hover:border-[#c9a961]/30 transition-all duration-300 ${editingBookId === book.id ? 'editing' : ''}" data-book-id="${book.id}">
        <div class="flex items-start justify-between gap-4 mb-4">
          <div class="flex items-start gap-3 flex-1 min-w-0">
            <div class="w-12 h-16 bg-gradient-to-br from-[#1a3a5c] to-[#0f1f33] border border-[#3a5070] rounded-lg flex items-center justify-center flex-shrink-0">
              <svg class="w-6 h-6 text-[#c9a961]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
              </svg>
            </div>
            <div class="min-w-0 flex-1">
              <h3 class="font-medium text-[#e8e4dc] text-sm md:text-base truncate">${escapeHtml(book.title) || 'Untitled'}</h3>
              <p class="text-xs text-[#8b9aab] mt-0.5 truncate">${escapeHtml(book.author) || 'Unknown author'}</p>
            </div>
          </div>
          <span class="status-badge ${getStatusClass(book.status)} flex-shrink-0">
            ${getStatusIcon(book.status)}
            ${book.status}
          </span>
        </div>

        <div class="flex items-center gap-4 mb-4 text-xs">
          <div class="flex items-center gap-1.5 text-[#6b7a8f]">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
            </svg>
            <span class="font-mono">${escapeHtml(book.isbn) || 'N/A'}</span>
          </div>
          <div class="flex items-center gap-1.5 text-[#6b7a8f]">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
            </svg>
            <span>${book.genre || 'Fiction'}</span>
          </div>
        </div>

        <div class="flex items-center gap-2 pt-3 border-t border-[#2a3544]">
          <button class="btn-icon edit-btn text-[#8b9aab] hover:text-[#c9a961] flex-1 flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-[#2a3544] transition-all duration-200" data-id="${book.id}">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
            <span class="text-xs font-medium">Edit</span>
          </button>
          <button class="btn-icon delete-btn text-[#8b9aab] hover:text-[#f87171] flex-1 flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-[#2a1515] transition-all duration-200" data-id="${book.id}">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
            <span class="text-xs font-medium">Delete</span>
          </button>
        </div>
      </div>
    `).join('');

    document.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const book = books.find(b => b.id === btn.dataset.id);
        if (book) enterEditMode(book);
      });
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', () => deleteBook(btn.dataset.id));
    });
  }

  function saveBook(e) {
    if (e) e.preventDefault();
    
    const title = titleInput.value.trim();
    const author = authorInput.value.trim();
    const isbn = isbnInput.value.trim();
    const status = statusInput.value;
    const genre = genreInput.value;

    if (!title || !author || !isbn) {
      alert('Please fill in all required fields: Title, Author, and ISBN.');
      return;
    }

    if (editingBookId) {
      const idx = books.findIndex(b => b.id === editingBookId);
      if (idx !== -1) {
        books[idx] = { ...books[idx], title, author, isbn, status, genre };
      }
    } else {
      books.push({ id: generateId(), title, author, isbn, status, genre });
    }

    resetForm();
    updateStats();
    filterBooks();
  }

  function deleteBook(id) {
    if (!confirm('Are you sure you want to remove this volume from the collection?')) return;
    
    books = books.filter(b => b.id !== id);
    if (editingBookId === id) resetForm();
    updateStats();
    filterBooks();
  }

  function initLibrary() {
    books = initialBooks.map(b => ({ ...b }));
    updateDateTime();
    setInterval(updateDateTime, 60000);
    updateStats();
    renderBooks();

    saveBookBtn.addEventListener('click', saveBook);
    cancelEditBtn.addEventListener('click', resetForm);

    searchInput.addEventListener('input', filterBooks);
    filterStatus.addEventListener('change', filterBooks);

    [titleInput, authorInput, isbnInput].forEach(input => {
      input.addEventListener('keypress', e => {
        if (e.key === 'Enter') { e.preventDefault(); saveBook(); }
      });
    });
  }

  initLibrary();
})();
