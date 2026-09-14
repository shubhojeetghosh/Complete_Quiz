document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       API CONFIGURATION
    ===================================================== */

    const API_BASE_URL =
        window.EPS_API?.baseUrl ||
        "http://127.0.0.1:8000";


    /* =====================================================
       PASSWORD SHOW / HIDE
    ===================================================== */

    const passwordToggleButtons =
        document.querySelectorAll(".password-toggle");

    passwordToggleButtons.forEach(button => {

        button.addEventListener("click", () => {

            const targetId =
                button.dataset.target;

            const passwordInput =
                document.getElementById(targetId);

            if (!passwordInput) {
                return;
            }

            if (passwordInput.type === "password") {

                passwordInput.type = "text";

                button.textContent = "Hide";

                button.setAttribute(
                    "aria-label",
                    "Hide password"
                );

            } else {

                passwordInput.type = "password";

                button.textContent = "Show";

                button.setAttribute(
                    "aria-label",
                    "Show password"
                );

            }

        });

    });


    /* =====================================================
       CURRENT USERS
    ===================================================== */

    let currentUsers = [];


    /* =====================================================
       DYNAMIC DATA ELEMENTS
    ===================================================== */

    const totalUsers =
        document.getElementById("totalUsers");

    const usersGrowth =
        document.getElementById("usersGrowth");

    const totalQuizzes =
        document.getElementById("totalQuizzes");

    const quizzesGrowth =
        document.getElementById("quizzesGrowth");

    const totalQuestions =
        document.getElementById("totalQuestions");

    const questionsGrowth =
        document.getElementById("questionsGrowth");

    const totalAttempts =
        document.getElementById("totalAttempts");

    const attemptsGrowth =
        document.getElementById("attemptsGrowth");

    const activityList =
        document.getElementById("activityList");

    const usersTable =
        document.getElementById("usersTable");

    const quizzesTable =
        document.getElementById("quizzesTable");

    const averageScore =
        document.getElementById("averageScore");

    const passRate =
        document.getElementById("passRate");

    const todayAttempts =
        document.getElementById("todayAttempts");


    /* =====================================================
       ADMIN PROFILE ELEMENTS
    ===================================================== */

    const sidebarAdminName =
        document.getElementById("sidebarAdminName");

    const sidebarAdminRole =
        document.getElementById("sidebarAdminRole");

    const sidebarAdminAvatar =
        document.getElementById("sidebarAdminAvatar");

    const topAdminName =
        document.getElementById("topAdminName");

    const topAdminRole =
        document.getElementById("topAdminRole");

    const topAdminAvatar =
        document.getElementById("topAdminAvatar");

    const welcomeAdminName =
        document.getElementById("welcomeAdminName");

    const settingsAdminName =
        document.getElementById("settingsAdminName");

    const settingsAdminEmail =
        document.getElementById("settingsAdminEmail");


    /* =====================================================
       NAVIGATION ELEMENTS
    ===================================================== */

    const navItems =
        document.querySelectorAll(".nav-item");

    const sections =
        document.querySelectorAll(".content-section");

    const pageTitle =
        document.getElementById("pageTitle");

    const pageSubtitle =
        document.getElementById("pageSubtitle");

    const mobileMenu =
        document.getElementById("mobileMenu");

    const sidebar =
        document.querySelector(".sidebar");


    /* =====================================================
       DASHBOARD STATISTICS
    ===================================================== */

    function updateDashboardStats(data) {

        data = data || {};

        if (totalUsers) {
            totalUsers.textContent =
                data.totalUsers ?? 0;
        }

        if (usersGrowth) {
            usersGrowth.textContent =
                `↑ ${data.usersGrowth ?? 0}%`;
        }

        if (totalQuizzes) {
            totalQuizzes.textContent =
                data.totalQuizzes ?? 0;
        }

        if (quizzesGrowth) {
            quizzesGrowth.textContent =
                `↑ ${data.quizzesGrowth ?? 0}%`;
        }

        if (totalQuestions) {
            totalQuestions.textContent =
                data.totalQuestions ?? 0;
        }

        if (questionsGrowth) {
            questionsGrowth.textContent =
                `↑ ${data.questionsGrowth ?? 0}%`;
        }

        if (totalAttempts) {
            totalAttempts.textContent =
                data.totalAttempts ?? 0;
        }

        if (attemptsGrowth) {
            attemptsGrowth.textContent =
                `↑ ${data.attemptsGrowth ?? 0}%`;
        }

    }


    /* =====================================================
       RESULTS
    ===================================================== */

    function updateResults(data) {

        data = data || {};

        if (averageScore) {
            averageScore.textContent =
                `${data.averageScore ?? 0}%`;
        }

        if (passRate) {
            passRate.textContent =
                `${data.passRate ?? 0}%`;
        }

        if (todayAttempts) {
            todayAttempts.textContent =
                data.todayAttempts ?? 0;
        }

        const totalResultAttempts =
            document.getElementById(
                "totalResultAttempts"
            );

        if (totalResultAttempts) {

            totalResultAttempts.textContent =
                data.totalAttempts ?? 0;

        }

    }


    /* =====================================================
       ADMIN AVATAR HELPER
    ===================================================== */

    function setAdminAvatar(element, imageUrl, name) {

        if (!element) {
            return;
        }

        /*
         * If profile picture exists,
         * display it.
         */

        if (imageUrl) {

            element.textContent = "";

            element.style.backgroundImage =
                `url("${imageUrl}")`;

            element.style.backgroundSize =
                "cover";

            element.style.backgroundPosition =
                "center";

            element.style.backgroundRepeat =
                "no-repeat";

            return;
        }


        /*
         * No profile picture.
         *
         * Show first letter of the
         * actual admin name.
         */

        element.style.backgroundImage =
            "none";

        const firstLetter =
            name
                ? name.charAt(0).toUpperCase()
                : "";

        element.textContent =
            firstLetter;
    }


    /* =====================================================
       UPDATE ADMIN PROFILE
    ===================================================== */

    function updateAdminProfile(data) {

        data = data || {};

        const name =
            data.name || "";

        const role =
            data.role || "ADMIN";

        const email =
            data.email || "";


        /*
         * Profile picture is stored temporarily
         * in localStorage.
         */

        const savedProfilePicture =
            localStorage.getItem(
                "adminProfilePicture"
            ) || "";


        /* =================================================
           SIDEBAR ADMIN NAME
        ================================================= */

        if (sidebarAdminName) {

            sidebarAdminName.textContent =
                name;

        }


        /* =================================================
           SIDEBAR ADMIN ROLE
        ================================================= */

        if (sidebarAdminRole) {

            sidebarAdminRole.textContent =
                role;

        }


        /* =================================================
           SIDEBAR ADMIN AVATAR
        ================================================= */

        setAdminAvatar(
            sidebarAdminAvatar,
            savedProfilePicture,
            name
        );


        /* =================================================
           TOP ADMIN NAME
        ================================================= */

        if (topAdminName) {

            topAdminName.textContent =
                name;

        }


        /* =================================================
           TOP ADMIN ROLE
        ================================================= */

        if (topAdminRole) {

            topAdminRole.textContent =
                role;

        }


        /* =================================================
           TOP ADMIN AVATAR
        ================================================= */

        setAdminAvatar(
            topAdminAvatar,
            savedProfilePicture,
            name
        );


        /* =================================================
           WELCOME MESSAGE
        ================================================= */

        if (welcomeAdminName) {

            welcomeAdminName.textContent =
                name;

        }


        /* =================================================
           SETTINGS NAME
        ================================================= */

        if (settingsAdminName) {

            settingsAdminName.value =
                name;

        }


        /* =================================================
           SETTINGS EMAIL
        ================================================= */

        if (settingsAdminEmail) {

            settingsAdminEmail.value =
                email;

        }


        console.log(
            "Admin profile displayed:",
            {
                name: name,
                email: email,
                role: role
            }
        );

    }


    /* =====================================================
       LOAD LOGGED-IN ADMIN
       
       IMPORTANT:
       This function uses ONLY admin_user.
       
       It DOES NOT use:
       localStorage.access_token
       
       This prevents the student token from being
       accidentally displayed in the Admin Dashboard.
    ===================================================== */

    function loadLoggedInAdmin() {

        console.log(
            "Loading logged-in admin..."
        );


        /* =================================================
           GET ADMIN TOKEN
        ================================================= */

        const adminToken =
            localStorage.getItem(
                "admin_access_token"
            );


        /* =================================================
           GET ADMIN USER
        ================================================= */

        const savedAdmin =
            localStorage.getItem(
                "admin_user"
            );


        console.log(
            "Admin token exists:",
            Boolean(adminToken)
        );

        console.log(
            "Admin user exists:",
            Boolean(savedAdmin)
        );


        /* =================================================
           ADMIN TOKEN REQUIRED
        ================================================= */

        if (!adminToken) {

            console.error(
                "No admin_access_token found."
            );

            alert(
                "Admin session not found. Please login again."
            );

            window.location.href =
                "ad-login.html";

            return;

        }


        /* =================================================
           ADMIN USER DATA REQUIRED
        ================================================= */

        if (!savedAdmin) {

            console.error(
                "No admin_user found in localStorage."
            );

            alert(
                "Admin profile information not found. Please login again."
            );

            localStorage.removeItem(
                "admin_access_token"
            );

            window.location.href =
                "ad-login.html";

            return;

        }


        /* =================================================
           PARSE ADMIN DATA
        ================================================= */

        let admin;

        try {

            admin =
                JSON.parse(savedAdmin);

        } catch (error) {

            console.error(
                "Invalid admin_user data:",
                error
            );

            localStorage.removeItem(
                "admin_user"
            );

            localStorage.removeItem(
                "admin_access_token"
            );

            alert(
                "Invalid admin session. Please login again."
            );

            window.location.href =
                "ad-login.html";

            return;

        }


        console.log(
            "Logged-in admin data:",
            admin
        );


        /* =================================================
           SECURITY CHECK
        ================================================= */

        const role =
            String(
                admin.role || ""
            ).toUpperCase();


        /*
         * Only ADMIN accounts can open
         * the Admin Dashboard.
         */

        if (role !== "ADMIN") {

            console.error(
                "Unauthorized account detected:",
                admin
            );

            localStorage.removeItem(
                "admin_access_token"
            );

            localStorage.removeItem(
                "admin_user"
            );

            alert(
                "Unauthorized account. Please login as an administrator."
            );

            window.location.href =
                "ad-login.html";

            return;

        }


        /* =================================================
           DISPLAY ADMIN
        ================================================= */

        updateAdminProfile({

            name:
                admin.name || "",

            email:
                admin.email || "",

            role:
                admin.role || "ADMIN"

        });

    }


    /* =====================================================
       UPDATE USERS TABLE
    ===================================================== */

    function updateUsersTable(users) {

        currentUsers =
            Array.isArray(users)
                ? users
                : [];


        if (!usersTable) {
            return;
        }


        usersTable.innerHTML = "";


        if (
            !users ||
            users.length === 0
        ) {

            usersTable.innerHTML = `
                <tr>
                    <td colspan="5">
                        <div class="empty-users">

                            <div class="empty-users-icon">
                                👥
                            </div>

                            <h3>
                                No users found
                            </h3>

                            <p>
                                There are currently no registered
                                users on the platform.
                            </p>

                        </div>
                    </td>
                </tr>
            `;

            return;

        }


        users.forEach(user => {

            const row =
                document.createElement("tr");


            const name =
                user.name || "Unknown";

            const email =
                user.email || "-";

            const status =
                user.status || "Active";


            const joined =
                user.created_at
                    ? new Date(
                        user.created_at
                    ).toLocaleDateString()
                    : "-";


            row.innerHTML = `

                <td>

                    <div class="table-user">

                        <div class="table-avatar">

                            ${name
                                .charAt(0)
                                .toUpperCase()}

                        </div>

                        ${name}

                    </div>

                </td>


                <td>
                    ${email}
                </td>


                <td>

                    <span
                        class="status ${status.toLowerCase()}-status"
                    >
                        ${status}
                    </span>

                </td>


                <td>
                    ${joined}
                </td>


                <td>

                    <div class="table-actions">

                        <button
                            class="table-action view-user-btn"
                            data-user-id="${user.id}">
                            View
                        </button>

                        <button
                            class="table-action edit-user-btn"
                            data-user-id="${user.id}">
                            Edit
                        </button>

                    </div>

                </td>

            `;


            usersTable.appendChild(row);

        });

    }


    /*
     * Initially show empty table.
     *
     * Real backend user loading can be connected later.
     */

    updateUsersTable([]);


    /* =====================================================
       UPDATE QUIZZES TABLE
    ===================================================== */

    function updateQuizzesTable(quizzes) {

        if (!quizzesTable) {
            return;
        }


        quizzesTable.innerHTML = "";


        if (
            !quizzes ||
            quizzes.length === 0
        ) {

            quizzesTable.innerHTML = `

                <tr>

                    <td
                        colspan="5"
                        class="empty-table"
                    >
                        No quizzes found.
                    </td>

                </tr>

            `;

            return;

        }


        quizzes.forEach(quiz => {

            const row =
                document.createElement("tr");


            const title =
                quiz.title ||
                "Untitled Quiz";


            const questionsCount =
                quiz.questions_count ?? 0;


            const status =
                quiz.status ||
                "Draft";


            const created =
                quiz.created_at
                    ? new Date(
                        quiz.created_at
                    ).toLocaleDateString()
                    : "-";


            row.innerHTML = `

                <td>
                    ${title}
                </td>

                <td>
                    ${questionsCount}
                </td>

                <td>

                    <span
                        class="status ${status.toLowerCase()}-status"
                    >
                        ${status}
                    </span>

                </td>

                <td>
                    ${created}
                </td>

                <td>

                    <div class="table-actions">

                        <button
                            class="table-action view-quiz-btn"
                            data-quiz-id="${quiz.id}">
                            View
                        </button>

                        <button
                            class="table-action edit-quiz-btn"
                            data-quiz-id="${quiz.id}">
                            Edit
                        </button>

                        <button
                            class="table-action delete-quiz-btn"
                            data-quiz-id="${quiz.id}">
                            Delete
                        </button>

                    </div>

                </td>

            `;


            quizzesTable.appendChild(row);

        });

    }


    /* =====================================================
       LOAD PUBLISHED QUIZZES
    ===================================================== */

function loadPublishedQuizzes() {
    try {
        const quizzes = JSON.parse(
            localStorage.getItem("admin_quizzes") || "[]"
        );

        updateQuizzesTable(quizzes);

        console.log("Quizzes loaded:", quizzes);
    } catch (error) {
        console.error("Error loading quizzes:", error);
        updateQuizzesTable([]);
    }
}


    /* =====================================================
       DELETE QUIZ
    ===================================================== */

    document.addEventListener(
        "click",
        function(event) {

            const deleteButton =
                event.target.closest(
                    ".delete-quiz-btn"
                );


            if (!deleteButton) {
                return;
            }


            const quizId =
                deleteButton.dataset.quizId;


            if (!quizId) {
                return;
            }


            alert(
                "Quiz deletion is ready. " +
                "Backend integration will be added later."
            );

        }
    );


    /* =====================================================
       VIEW QUIZ
    ===================================================== */

    document.addEventListener(
        "click",
        function(event) {

            const viewButton =
                event.target.closest(
                    ".view-quiz-btn"
                );


            if (!viewButton) {
                return;
            }


            const quizId =
                viewButton.dataset.quizId;


            if (!quizId) {
                return;
            }


            window.location.href =
                `admin-view-quiz.html?id=${encodeURIComponent(
                    quizId
                )}`;

        }
    );


    /* =====================================================
       EDIT QUIZ
    ===================================================== */

    document.addEventListener(
        "click",
        function(event) {

            const editButton =
                event.target.closest(
                    ".edit-quiz-btn"
                );


            if (!editButton) {
                return;
            }


            const quizId =
                editButton.dataset.quizId;


            if (!quizId) {
                return;
            }


            window.location.href =
                `admin-create-quiz.html?edit=${encodeURIComponent(
                    quizId
                )}`;

        }
    );


    loadPublishedQuizzes();


    /* =====================================================
       SIDEBAR NAVIGATION
    ===================================================== */

    navItems.forEach(item => {

        item.addEventListener(
            "click",
            event => {

                const sectionName =
                    item.dataset.section;


                /*
                 * Separate HTML pages do not have
                 * data-section.
                 */

                if (!sectionName) {
                    return;
                }


                event.preventDefault();


                navItems.forEach(nav => {

                    nav.classList.remove(
                        "active"
                    );

                });


                item.classList.add(
                    "active"
                );


                sections.forEach(section => {

                    section.classList.remove(
                        "active"
                    );

                });


                const selectedSection =
                    document.getElementById(
                        sectionName
                    );


                if (selectedSection) {

                    selectedSection.classList.add(
                        "active"
                    );

                }


                const pageMeta = {

                    dashboard: {

                        title:
                            "Dashboard",

                        subtitle:
                            "Overview of your EPS TOPIK platform"

                    },

                    users: {

                        title:
                            "Users",

                        subtitle:
                            "Manage platform users"

                    },

                    quizzes: {

                        title:
                            "Quizzes",

                        subtitle:
                            "Create and manage quizzes"

                    },

                    results: {

                        title:
                            "Results",

                        subtitle:
                            "View quiz results and performance"

                    },

                    payments: {

                        title:
                            "Payments",

                        subtitle:
                            "Manage and monitor payment activity"

                    },

                    settings: {

                        title:
                            "Settings",

                        subtitle:
                            "Manage admin panel settings"

                    }

                };


                if (
                    pageMeta[sectionName] &&
                    pageTitle &&
                    pageSubtitle
                ) {

                    pageTitle.textContent =
                        pageMeta[
                            sectionName
                        ].title;


                    pageSubtitle.textContent =
                        pageMeta[
                            sectionName
                        ].subtitle;

                }


                if (sidebar) {

                    sidebar.classList.remove(
                        "open"
                    );

                }

            }
        );

    });


    /* =====================================================
       LOAD SECTION FROM URL HASH
    ===================================================== */

    function loadSectionFromHash() {

        const hash =
            window.location.hash.replace(
                "#",
                ""
            );


        if (!hash) {
            return;
        }


        const targetSection =
            document.getElementById(
                hash
            );


        if (!targetSection) {
            return;
        }


        const targetNav =
            document.querySelector(
                `.nav-item[data-section="${hash}"]`
            );


        navItems.forEach(nav => {

            nav.classList.remove(
                "active"
            );

        });


        sections.forEach(section => {

            section.classList.remove(
                "active"
            );

        });


        targetSection.classList.add(
            "active"
        );


        if (targetNav) {

            targetNav.classList.add(
                "active"
            );

        }


        const pageMeta = {

            dashboard: {

                title:
                    "Dashboard",

                subtitle:
                    "Overview of your EPS TOPIK platform"

            },

            users: {

                title:
                    "Users",

                subtitle:
                    "Manage platform users"

            },

            quizzes: {

                title:
                    "Quizzes",

                subtitle:
                    "Create and manage quizzes"

            },

            results: {

                title:
                    "Results",

                subtitle:
                    "View quiz results and performance"

            },

            payments: {

                title:
                    "Payments",

                subtitle:
                    "Manage and monitor payment activity"

            },

            settings: {

                title:
                    "Settings",

                subtitle:
                    "Manage admin panel settings"

            }

        };


        if (
            pageMeta[hash] &&
            pageTitle &&
            pageSubtitle
        ) {

            pageTitle.textContent =
                pageMeta[hash].title;


            pageSubtitle.textContent =
                pageMeta[hash].subtitle;

        }

    }


    loadSectionFromHash();


    window.addEventListener(
        "hashchange",
        loadSectionFromHash
    );


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    if (mobileMenu) {

        mobileMenu.addEventListener(
            "click",
            () => {

                if (sidebar) {

                    sidebar.classList.toggle(
                        "open"
                    );

                }

            }
        );

    }


    /* =====================================================
       QUICK ACTIONS
    ===================================================== */

    const quickActions =
        document.querySelectorAll(
            ".quick-action"
        );


    quickActions.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const action =
                    button.dataset.action;


                const mapping = {

                    user:
                        "users",

                    results:
                        "results"

                };


                const target =
                    mapping[action];


                if (!target) {
                    return;
                }


                const targetNav =
                    document.querySelector(
                        `.nav-item[data-section="${target}"]`
                    );


                if (targetNav) {

                    targetNav.click();

                }

            }
        );

    });


    /* =====================================================
       USER SEARCH
    ===================================================== */

    const userSearch =
        document.getElementById(
            "userSearch"
        );


    if (userSearch) {

        userSearch.addEventListener(
            "input",
            () => {

                const search =
                    userSearch.value.toLowerCase();


                const rows =
                    document.querySelectorAll(
                        "#usersTable tr"
                    );


                rows.forEach(row => {

                    const text =
                        row.textContent.toLowerCase();


                    row.style.display =
                        text.includes(search)
                            ? ""
                            : "none";

                });

            }
        );

    }


    /* =====================================================
       VIEW USER MODAL
    ===================================================== */

    const viewUserModal =
        document.getElementById(
            "viewUserModal"
        );

    const closeViewUserModal =
        document.getElementById(
            "closeViewUserModal"
        );

    const closeViewUser =
        document.getElementById(
            "closeViewUser"
        );

    const viewUserAvatar =
        document.getElementById(
            "viewUserAvatar"
        );

    const viewUserName =
        document.getElementById(
            "viewUserName"
        );

    const viewUserEmail =
        document.getElementById(
            "viewUserEmail"
        );

    const viewUserStatus =
        document.getElementById(
            "viewUserStatus"
        );

    const viewUserJoined =
        document.getElementById(
            "viewUserJoined"
        );


    function openViewUserModal(user) {

        if (
            !viewUserModal ||
            !user
        ) {
            return;
        }


        const name =
            user.name ||
            "Unknown User";


        if (viewUserAvatar) {

            viewUserAvatar.textContent =
                name
                    .charAt(0)
                    .toUpperCase();

        }


        if (viewUserName) {

            viewUserName.textContent =
                name;

        }


        if (viewUserEmail) {

            viewUserEmail.textContent =
                user.email || "-";

        }


        if (viewUserStatus) {

            viewUserStatus.textContent =
                user.status || "Active";

        }


        if (viewUserJoined) {

            viewUserJoined.textContent =
                user.created_at
                    ? new Date(
                        user.created_at
                    ).toLocaleDateString()
                    : "-";

        }


        viewUserModal.classList.add(
            "active"
        );

    }


    function closeViewUserModalWindow() {

        if (!viewUserModal) {
            return;
        }


        viewUserModal.classList.remove(
            "active"
        );

    }


    if (closeViewUserModal) {

        closeViewUserModal.addEventListener(
            "click",
            closeViewUserModalWindow
        );

    }


    if (closeViewUser) {

        closeViewUser.addEventListener(
            "click",
            closeViewUserModalWindow
        );

    }


    if (viewUserModal) {

        viewUserModal.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    viewUserModal
                ) {

                    closeViewUserModalWindow();

                }

            }
        );

    }


    /* =====================================================
       EDIT USER MODAL
    ===================================================== */

    const editUserModal =
        document.getElementById(
            "editUserModal"
        );

    const closeEditUserModal =
        document.getElementById(
            "closeEditUserModal"
        );

    const cancelEditUser =
        document.getElementById(
            "cancelEditUser"
        );

    const editUserForm =
        document.getElementById(
            "editUserForm"
        );

    const editUserId =
        document.getElementById(
            "editUserId"
        );

    const editUserName =
        document.getElementById(
            "editUserName"
        );

    const editUserEmail =
        document.getElementById(
            "editUserEmail"
        );

    const editUserStatus =
        document.getElementById(
            "editUserStatus"
        );


    function openEditUserModal(user) {

        if (
            !editUserModal ||
            !user
        ) {
            return;
        }


        if (editUserId) {

            editUserId.value =
                user.id || "";

        }


        if (editUserName) {

            editUserName.value =
                user.name || "";

        }


        if (editUserEmail) {

            editUserEmail.value =
                user.email || "";

        }


        if (editUserStatus) {

            editUserStatus.value =
                user.status || "Active";

        }


        editUserModal.classList.add(
            "active"
        );

    }


    function closeEditUserModalWindow() {

        if (!editUserModal) {
            return;
        }


        editUserModal.classList.remove(
            "active"
        );


        if (editUserForm) {

            editUserForm.reset();

        }

    }


    if (closeEditUserModal) {

        closeEditUserModal.addEventListener(
            "click",
            closeEditUserModalWindow
        );

    }


    if (cancelEditUser) {

        cancelEditUser.addEventListener(
            "click",
            closeEditUserModalWindow
        );

    }


    if (editUserModal) {

        editUserModal.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    editUserModal
                ) {

                    closeEditUserModalWindow();

                }

            }
        );

    }


    if (editUserForm) {

        editUserForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                alert(
                    "User editing is ready. " +
                    "Backend integration will be added later."
                );


                closeEditUserModalWindow();

            }
        );

    }


    /* =====================================================
       USER TABLE ACTION HANDLER
    ===================================================== */

    if (usersTable) {

        usersTable.addEventListener(
            "click",
            event => {

                const button =
                    event.target.closest(
                        ".table-action"
                    );


                if (!button) {
                    return;
                }


                const userId =
                    button.dataset.userId;


                if (!userId) {
                    return;
                }


                const selectedUser =
                    currentUsers.find(
                        user =>
                            String(user.id) ===
                            String(userId)
                    );


                if (!selectedUser) {

                    console.error(
                        "User not found:",
                        userId
                    );

                    return;

                }


                if (
                    button.classList.contains(
                        "view-user-btn"
                    )
                ) {

                    openViewUserModal(
                        selectedUser
                    );

                }


                if (
                    button.classList.contains(
                        "edit-user-btn"
                    )
                ) {

                    openEditUserModal(
                        selectedUser
                    );

                }

            }
        );

    }


    /* =====================================================
       TERMS & CONDITIONS
    ===================================================== */

    const termsModal =
        document.getElementById(
            "termsModal"
        );

    const viewTermsBtn =
        document.getElementById(
            "viewTermsBtn"
        );

    const closeTermsModal =
        document.getElementById(
            "closeTermsModal"
        );

    const closeTermsBtn =
        document.getElementById(
            "closeTermsBtn"
        );


    function openTermsModal() {

        if (!termsModal) {
            return;
        }


        termsModal.classList.add(
            "active"
        );

    }


    function closeTermsModalWindow() {

        if (!termsModal) {
            return;
        }


        termsModal.classList.remove(
            "active"
        );

    }


    if (viewTermsBtn) {

        viewTermsBtn.addEventListener(
            "click",
            openTermsModal
        );

    }


    if (closeTermsModal) {

        closeTermsModal.addEventListener(
            "click",
            closeTermsModalWindow
        );

    }


    if (closeTermsBtn) {

        closeTermsBtn.addEventListener(
            "click",
            closeTermsModalWindow
        );

    }


    if (termsModal) {

        termsModal.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    termsModal
                ) {

                    closeTermsModalWindow();

                }

            }
        );

    }


    /* =====================================================
       ADMIN SETTINGS
    ===================================================== */

    const saveAdminSettings =
        document.getElementById(
            "saveAdminSettings"
        );


    /*
     * DO NOT call:
     *
     * updateAdminProfile({
     *     name: "",
     *     email: "",
     *     role: ""
     * });
     *
     * because that would overwrite the actual
     * logged-in admin information.
     */


    if (saveAdminSettings) {

        saveAdminSettings.addEventListener(
            "click",
            () => {

                alert(
                    "Admin profile will be connected to the backend."
                );

            }
        );

    }


    /* =====================================================
       LOGOUT
    ===================================================== */

    const logoutBtn =
        document.getElementById(
            "logoutBtn"
        );


    if (logoutBtn) {

        logoutBtn.addEventListener(
            "click",
            () => {

                const confirmed =
                    confirm(
                        "Are you sure you want to logout?"
                    );


                if (!confirmed) {
                    return;
                }


                /*
                 * Remove ONLY admin authentication.
                 *
                 * Student authentication is kept separate.
                 */

                localStorage.removeItem(
                    "admin_access_token"
                );

                localStorage.removeItem(
                    "admin_user"
                );


                /*
                 * Do not remove:
                 *
                 * student_access_token
                 * student_user
                 */


                window.location.href =
                    "ad-login.html";

            }
        );

    }


    /* =====================================================
       ADD USER MODAL
    ===================================================== */

    const addUserBtn =
        document.getElementById(
            "addUserBtn"
        );

    const addUserModal =
        document.getElementById(
            "addUserModal"
        );

    const closeAddUserModal =
        document.getElementById(
            "closeAddUserModal"
        );

    const cancelAddUser =
        document.getElementById(
            "cancelAddUser"
        );

    const addUserForm =
        document.getElementById(
            "addUserForm"
        );


    function openAddUserModal() {

        if (!addUserModal) {
            return;
        }


        addUserModal.classList.add(
            "active"
        );

    }


    function closeAddUserModalWindow() {

        if (!addUserModal) {
            return;
        }


        addUserModal.classList.remove(
            "active"
        );


        if (addUserForm) {

            addUserForm.reset();

        }

    }


    if (addUserBtn) {

        addUserBtn.addEventListener(
            "click",
            openAddUserModal
        );

    }


    if (closeAddUserModal) {

        closeAddUserModal.addEventListener(
            "click",
            closeAddUserModalWindow
        );

    }


    if (cancelAddUser) {

        cancelAddUser.addEventListener(
            "click",
            closeAddUserModalWindow
        );

    }


    if (addUserModal) {

        addUserModal.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    addUserModal
                ) {

                    closeAddUserModalWindow();

                }

            }
        );

    }


    if (addUserForm) {

        addUserForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                alert(
                    "The Add User form is ready. " +
                    "Backend integration will be added later."
                );


                closeAddUserModalWindow();

            }
        );

    }


    /* =====================================================
       PROFILE PICTURE MANAGEMENT
    ===================================================== */

    const profilePictureInput =
        document.getElementById(
            "profilePictureInput"
        );

    const profilePicturePreview =
        document.getElementById(
            "profilePicturePreview"
        );

    const removeProfilePicture =
        document.getElementById(
            "removeProfilePicture"
        );


    /* =====================================================
       APPLY PROFILE PICTURE TO AVATARS
    ===================================================== */

    function applyProfilePictureToAvatars(
        imageData
    ) {

        /*
         * Get current admin name.
         */

        let adminName = "";

        const savedAdmin =
            localStorage.getItem(
                "admin_user"
            );


        if (savedAdmin) {

            try {

                const admin =
                    JSON.parse(
                        savedAdmin
                    );

                adminName =
                    admin.name || "";

            } catch {

                adminName = "";

            }

        }


        /* =================================================
           TOP AVATAR
        ================================================= */

        setAdminAvatar(
            topAdminAvatar,
            imageData,
            adminName
        );


        /* =================================================
           SIDEBAR AVATAR
        ================================================= */

        setAdminAvatar(
            sidebarAdminAvatar,
            imageData,
            adminName
        );

    }


    /* =====================================================
       LOAD SAVED PROFILE PICTURE
    ===================================================== */

    function loadProfilePicture() {

        const savedPicture =
            localStorage.getItem(
                "adminProfilePicture"
            ) || "";


        /* =================================================
           PROFILE PAGE PREVIEW
        ================================================= */

        if (profilePicturePreview) {

            if (savedPicture) {

                profilePicturePreview.textContent =
                    "";

                profilePicturePreview.style.backgroundImage =
                    `url("${savedPicture}")`;

                profilePicturePreview.style.backgroundSize =
                    "cover";

                profilePicturePreview.style.backgroundPosition =
                    "center";

                profilePicturePreview.style.backgroundRepeat =
                    "no-repeat";

            } else {

                profilePicturePreview.style.backgroundImage =
                    "none";

                profilePicturePreview.textContent =
                    "";

            }

        }


        /* =================================================
           APPLY TO AVATARS
        ================================================= */

        applyProfilePictureToAvatars(
            savedPicture
        );

    }


    /* =====================================================
       CHANGE PROFILE PICTURE
    ===================================================== */

    if (profilePictureInput) {

        profilePictureInput.addEventListener(
            "change",
            event => {

                const file =
                    event.target.files[0];


                if (!file) {
                    return;
                }


                const allowedTypes = [

                    "image/jpeg",

                    "image/png",

                    "image/webp"

                ];


                if (
                    !allowedTypes.includes(
                        file.type
                    )
                ) {

                    alert(
                        "Please select a JPG, PNG or WebP image."
                    );


                    profilePictureInput.value =
                        "";


                    return;

                }


                const maxSize =
                    2 * 1024 * 1024;


                if (
                    file.size >
                    maxSize
                ) {

                    alert(
                        "Profile picture must be smaller than 2 MB."
                    );


                    profilePictureInput.value =
                        "";


                    return;

                }


                const reader =
                    new FileReader();


                reader.onload =
                    function() {

                        const imageData =
                            reader.result;


                        localStorage.setItem(
                            "adminProfilePicture",
                            imageData
                        );


                        if (
                            profilePicturePreview
                        ) {

                            profilePicturePreview.textContent =
                                "";

                            profilePicturePreview.style.backgroundImage =
                                `url("${imageData}")`;

                            profilePicturePreview.style.backgroundSize =
                                "cover";

                            profilePicturePreview.style.backgroundPosition =
                                "center";

                            profilePicturePreview.style.backgroundRepeat =
                                "no-repeat";

                        }


                        applyProfilePictureToAvatars(
                            imageData
                        );


                        alert(
                            "Profile picture updated successfully."
                        );

                    };


                reader.onerror =
                    function() {

                        alert(
                            "Unable to read the selected image."
                        );


                        profilePictureInput.value =
                            "";

                    };


                reader.readAsDataURL(
                    file
                );

            }
        );

    }


    /* =====================================================
       REMOVE PROFILE PICTURE
    ===================================================== */

    if (removeProfilePicture) {

        removeProfilePicture.addEventListener(
            "click",
            () => {

                const confirmed =
                    confirm(
                        "Are you sure you want to remove your profile picture?"
                    );


                if (!confirmed) {
                    return;
                }


                localStorage.removeItem(
                    "adminProfilePicture"
                );


                if (
                    profilePicturePreview
                ) {

                    profilePicturePreview.style.backgroundImage =
                        "none";

                    profilePicturePreview.textContent =
                        "";

                }


                applyProfilePictureToAvatars(
                    ""
                );


                if (profilePictureInput) {

                    profilePictureInput.value =
                        "";

                }


                alert(
                    "Profile picture removed."
                );

            }
        );

    }


    /* =====================================================
       LOAD PROFILE PICTURE
    ===================================================== */

    loadProfilePicture();


    /* =====================================================
       ACCOUNT SECURITY
    ===================================================== */

    const changePasswordForm =
        document.getElementById(
            "changePasswordForm"
        );

    const changePasswordBtn =
        document.getElementById(
            "changePasswordBtn"
        );

    const currentPasswordInput =
        document.getElementById(
            "currentPassword"
        );

    const newPasswordInput =
        document.getElementById(
            "newPassword"
        );

    const confirmPasswordInput =
        document.getElementById(
            "confirmPassword"
        );


    if (changePasswordForm) {

        changePasswordForm.addEventListener(
            "submit",
            async function(event) {

                event.preventDefault();


                const currentPassword =
                    currentPasswordInput?.value ||
                    "";

                const newPassword =
                    newPasswordInput?.value ||
                    "";

                const confirmPassword =
                    confirmPasswordInput?.value ||
                    "";


                /* =================================================
                   VALIDATION
                ================================================= */

                if (!currentPassword) {

                    alert(
                        "Please enter your current password."
                    );


                    currentPasswordInput?.focus();


                    return;

                }


                if (!newPassword) {

                    alert(
                        "Please enter your new password."
                    );


                    newPasswordInput?.focus();


                    return;

                }


                if (
                    newPassword.length <
                    8
                ) {

                    alert(
                        "New password must contain at least 8 characters."
                    );


                    newPasswordInput?.focus();


                    return;

                }


                if (!confirmPassword) {

                    alert(
                        "Please confirm your new password."
                    );


                    confirmPasswordInput?.focus();


                    return;

                }


                if (
                    newPassword !==
                    confirmPassword
                ) {

                    alert(
                        "New passwords do not match."
                    );


                    confirmPasswordInput?.focus();


                    return;

                }


                if (
                    currentPassword ===
                    newPassword
                ) {

                    alert(
                        "New password must be different from your current password."
                    );


                    newPasswordInput?.focus();


                    return;

                }


                /* =================================================
                   IMPORTANT:
                   USE ADMIN TOKEN ONLY
                ================================================= */

                const accessToken =
                    localStorage.getItem(
                        "admin_access_token"
                    );


                if (!accessToken) {

                    alert(
                        "Your admin session has expired. Please login again."
                    );


                    window.location.href =
                        "ad-login.html";


                    return;

                }


                /* =================================================
                   BUTTON LOADING
                ================================================= */

                if (changePasswordBtn) {

                    changePasswordBtn.disabled =
                        true;


                    changePasswordBtn.textContent =
                        "Changing Password...";

                }


                try {

                    /* =================================================
                       ADMIN CHANGE PASSWORD API
                    ================================================= */

                    const response =
                        await fetch(
                            `${API_BASE_URL}/auth/admin/change-password`,
                            {

                                method:
                                    "POST",

                                headers: {

                                    "Content-Type":
                                        "application/json",

                                    "Authorization":
                                        `Bearer ${accessToken}`

                                },

                                body:
                                    JSON.stringify({

                                        current_password:
                                            currentPassword,

                                        new_password:
                                            newPassword,

                                        confirm_password:
                                            confirmPassword

                                    })

                            }
                        );


                    let data = {};


                    try {

                        data =
                            await response.json();

                    } catch {

                        data = {};

                    }


                    /* =================================================
                       UNAUTHORIZED
                    ================================================= */

                    if (
                        response.status ===
                        401
                    ) {

                        localStorage.removeItem(
                            "admin_access_token"
                        );

                        localStorage.removeItem(
                            "admin_user"
                        );


                        alert(
                            "Your admin session has expired. Please login again."
                        );


                        window.location.href =
                            "ad-login.html";


                        return;

                    }


                    /* =================================================
                       OTHER ERROR
                    ================================================= */

                    if (!response.ok) {

                        throw new Error(

                            data.detail ||

                            data.message ||

                            "Unable to change password."

                        );

                    }


                    /* =================================================
                       SUCCESS
                    ================================================= */

                    alert(
                        data.message ||
                        "Password changed successfully."
                    );


                    changePasswordForm.reset();

                } catch (error) {

                    console.error(
                        "Change password error:",
                        error
                    );


                    alert(
                        error.message ||
                        "Unable to change password. Please try again."
                    );

                } finally {

                    if (changePasswordBtn) {

                        changePasswordBtn.disabled =
                            false;


                        changePasswordBtn.textContent =
                            "Change Password";

                    }

                }

            }
        );

    }


    /* =====================================================
       LOAD ADMIN PROFILE LAST
       
       This is intentionally at the end so all DOM elements
       are already available before profile information
       is displayed.
    ===================================================== */

    loadLoggedInAdmin();

});