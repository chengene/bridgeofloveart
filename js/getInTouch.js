const SERVICE_ID = "service_qljt3kh"
const TEMPLATE_ID = "template_n6jjdaj"
const PUBLIC_KEY = "oFO364wLXze-Ixp42"

emailjs.init(PUBLIC_KEY)

const form = document.getElementById("contact-form")

form.addEventListener("submit", function(e){

  e.preventDefault()

  emailjs.sendForm(
    SERVICE_ID,
    TEMPLATE_ID,
    this
  )
  .then(() => {
      alert("Message sent successfully!")
      form.reset()
  })
  .catch((err) => {
      console.error("Email sending error:", err)
      alert("Failed to send message. Please try again.")
  })

})
