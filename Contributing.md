

## How to Contribute

1. **Raise an Issue**  
   - Go to the **Issues** tab in the repository  
   - Click **New Issue**  
   - Clearly describe the bug, suggestion, or improvement  

2. **Fork the Repository**  

3. **Clone your fork**  
   ```bash
   git clone https://github.com/your-username/ArtPortfolio_jtc.git


4. **Create a new branch for your issue**

   ```bash
   git checkout -b issue-123-description
   ```

   *(replace 123 with your issue number and description briefly)*

5. **Make your changes**

6. **Commit your changes** with a meaningful message

   ```bash
   git commit -m "Fix: description of your change"
   ```

7. **Push your branch to your fork**

   ```bash
   git push origin issue-123-description
   ```

8. **Open a Pull Request** to the main repository

   * Link your PR to the issue you raised

---

## Contribution Guidelines

* Follow clean code practices
* Maintain project structure
* Write clear commit messages
* Make sure your code works as expected
* Include screenshots if your changes affect the UI

---

## 📁 Project Structure Guidelines

To keep the project clean, scalable, and easy to maintain, contributors must place new files in their correct directories. Misplaced files make the project harder to manage and review.

---

## ✅ Where Files Should Go

### 🧩 HTML Files
- **Homepage only** → root directory  
  ```
  index.html
  ```
- **All other pages** → `/pages`
  ```
  /pages/about.html
  /pages/contact.html
  /pages/getInTouch.html
  /pages/youtube.html
  ```
- **Art gallery pages** → `/pages/paintings`
  ```
  /pages/paintings/your-art-page.html
  ```

---

### 🧱 Reusable Components
Shared UI parts must go in:
```
/components
```
Examples:
```
/components/navbar.html
/components/footer.html
```

---

### 🎨 Stylesheets (CSS)
All CSS files must go in:
```
/css
```

**Guidelines**
- Global styles → `style.css`
- Page-specific styles → `aboutStyle.css`, `contactStyle.css`
- Effects & animations → descriptive names like `3d-effects.css`

---

### ⚙️ JavaScript Files
All JS files must go in:
```
/js
```

**Guidelines**
- Name files by feature or functionality
- Keep one responsibility per file

---

### 🖼 Assets
All images and media files must go in:
```
/assets/images
```

---

## ✅ Correct File Placement Examples

| Type | Correct Location |
|------|------------------|
| New page | `/pages/newpage.html` |
| New gallery page | `/pages/paintings/newart.html` |
| Reusable UI section | `/components/section.html` |
| Page stylesheet | `/css/newPageStyle.css` |
| Script file | `/js/featureName.js` |
| Image file | `/assets/images/artwork-name.jpg` |

---

## ❌ Practices to Avoid

- Do not add CSS or JS files in the root directory  
- Do not place page files outside `/pages`  
- Do not mix images with code files  
- Do not create new top-level folders without discussion  
- Do not rename or move folders without maintainer approval  

---

## 🎯 Why This Matters

- Maintains a clean and scalable structure  
- Reduces pull request review corrections  
- Helps new contributors follow best practices  
- Keeps the codebase professional and maintainable  

---

Pull requests that do not follow these guidelines may be requested to make changes before merging.

---

## Reporting Issues

When reporting a bug, please include:

* Steps to reproduce
* Expected vs actual behavior
* Screenshots if possible

---

Thank you for helping make **ArtPortfolio_jtc** better! ❤️
Happy coding 🚀

```
  
- First, raise an issue  
- Then create a branch for that issue  
- Work → commit → push → PR  


```
