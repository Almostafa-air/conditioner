"use client"

import { useState } from "react"

export default function HomePage() {
  const [selectedRating, setSelectedRating] = useState(0)
  const [reviews, setReviews] = useState([
    {
      name: "أحمد المحمد - المدينة المنورة",
      date: "منذ أسبوع",
      rating: 5,
      text: "خدمة ممتازة وسريعة! وصل الفني في نفس اليوم وأصلح المكيف بمهارة عالية. الأسعار معقولة والتعامل راقي. أنصح بهم بشدة لسكان المدينة المنورة.",
      service: "صيانة مكيف سبليت",
      avatar: "أح",
    },
    {
      name: "فاطمة السعود - قباء",
      date: "منذ 3 أيام",
      rating: 5,
      text: "شركة محترمة جداً، الفني وصل في الوقت المحدد وشرح لي المشكلة بوضوح. المكيف يشتغل الآن بكفاءة عالية. شكراً لكم على الخدمة المميزة.",
      service: "شحن فريون",
      avatar: "فا",
    },
    {
      name: "عبدالله الحربي - العوالي",
      date: "منذ 5 أيام",
      rating: 5,
      text: "تعاملت معهم في صيانة 3 مكيفات في البيت، كانت الخدمة احترافية من البداية للنهاية. الفنيين مهرة والأسعار مناسبة. بالتأكيد سأتعامل معهم مرة أخرى.",
      service: "عقد صيانة دورية",
      avatar: "عب",
    },
    {
      name: "سارة الأنصاري - الجامعة",
      date: "منذ أسبوعين",
      rating: 4,
      text: "خدمة جيدة والفني محترف، لكن تأخر قليلاً عن الموعد المحدد. بشكل عام راضية عن الخدمة والسعر مناسب.",
      service: "فك وتركيب",
      avatar: "سا",
    },
    {
      name: "محمد العتيبي - طيبة",
      date: "منذ شهر",
      rating: 5,
      text: "ممتازين في التعامل والخدمة سريعة. المكيف يعمل بكفاءة عالية بعد الصيانة. أسعارهم معقولة مقارنة بالآخرين.",
      service: "صيانة مكيف شباك",
      avatar: "مح",
    },
    {
      name: "نورا القحطاني - الملك فهد",
      date: "منذ شهر ونصف",
      rating: 4,
      text: "خدمة جيدة وفني ماهر، لكن كان بإمكانهم تنظيف المكان أكثر بعد انتهاء العمل. بشكل عام راضية عن النتيجة.",
      service: "شحن فريون",
      avatar: "نو",
    },
  ])

  const calculateStats = () => {
    const totalReviews = reviews.length
    const totalStars = reviews.reduce((sum, review) => sum + review.rating, 0)
    const averageRating = totalReviews > 0 ? (totalStars / totalReviews).toFixed(1) : "0.0"

    // حساب توزيع النجوم
    const starDistribution = [0, 0, 0, 0, 0]
    reviews.forEach((review) => {
      starDistribution[review.rating - 1]++
    })

    // حساب النسب المئوية
    const fiveStarPercent = Math.round((starDistribution[4] / totalReviews) * 100)
    const fourPlusStarPercent = Math.round(((starDistribution[4] + starDistribution[3]) / totalReviews) * 100)

    return {
      averageRating,
      totalReviews,
      starDistribution,
      customerSatisfaction: fourPlusStarPercent,
      serviceSpeed: Math.max(85, fourPlusStarPercent - 5),
      workQuality: Math.max(90, fourPlusStarPercent - 2),
      fairPricing: Math.max(88, fourPlusStarPercent - 7),
    }
  }

  const stats = calculateStats()

  const sendWhatsAppMessage = () => {
    const name = (document.getElementById("name") as HTMLInputElement)?.value
    const phone = (document.getElementById("phone") as HTMLInputElement)?.value
    const service = document.getElementById("service") as HTMLSelectElement
    const serviceText = service?.options[service.selectedIndex]?.text
    const message = (document.getElementById("message") as HTMLTextAreaElement)?.value

    if (!name || !phone || !service?.value || !message) {
      alert("يرجى ملء جميع الحقول المطلوبة")
      return
    }

    const whatsappMessage = `مرحباً، أود طلب خدمة صيانة مكيفات في المدينة المنورة

📝 البيانات:
الاسم: ${name}
رقم الهاتف: ${phone}
نوع الخدمة: ${serviceText}
الموقع: المدينة المنورة

📋 تفاصيل الطلب:
${message}

أرجو التواصل معي وإرسال فني في أقرب وقت ممكن، شكراً لكم.`

    const whatsappURL = `https://wa.me/966564267351?text=${encodeURIComponent(whatsappMessage)}`
    window.open(whatsappURL, "_blank")

    // إعادة تعيين النموذج
    const form = document.querySelector("form") as HTMLFormElement
    form?.reset()

    alert("تم إرسال طلبك بنجاح! سيصلك فني في المدينة المنورة قريباً.")
  }

  const sendReview = () => {
    const name = (document.getElementById("reviewName") as HTMLInputElement)?.value
    const area = (document.getElementById("reviewArea") as HTMLSelectElement)?.value
    const serviceType = (document.getElementById("reviewServiceType") as HTMLSelectElement)?.value
    const reviewText = (document.getElementById("reviewText") as HTMLTextAreaElement)?.value

    if (!name || !area || !serviceType || !reviewText || selectedRating === 0) {
      alert("يرجى ملء جميع الحقول واختيار التقييم")
      return
    }

    const stars = "★".repeat(selectedRating) + "☆".repeat(5 - selectedRating)

    const newReview = {
      name: `${name} - ${area}`,
      date: "الآن",
      rating: selectedRating,
      text: reviewText,
      service: serviceType,
      avatar: name.substring(0, 2),
    }

    setReviews((prevReviews) => [newReview, ...prevReviews])

    const reviewMessage = `تقييم جديد من عميل في المدينة المنورة ⭐

👤 الاسم: ${name}
📍 المنطقة: ${area}
🛠️ نوع الخدمة: ${serviceType}
⭐ التقييم: ${stars} (${selectedRating}/5)

💬 التعليق:
${reviewText}

---
شكراً لكم على الخدمة المميزة في المدينة المنورة!`

    const whatsappURL = `https://wa.me/966564267351?text=${encodeURIComponent(reviewMessage)}`
    window.open(whatsappURL, "_blank")

    // إعادة تعيين النموذج
    const form = document.querySelector(".review-form") as HTMLFormElement
    form?.reset()
    setSelectedRating(0)

    alert("شكراً لك! تم إضافة تقييمك وإرساله بنجاح.")
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
            <div className="flex items-center justify-center gap-2 text-xl font-bold">
              <i className="fas fa-snowflake"></i>
              فني صيانة وتركيب التكييفات - المدينة المنورة
            </div>
            <div className="flex flex-col md:flex-row items-center gap-3">
              <div className="bg-white/15 backdrop-blur-sm px-3 py-1 rounded-full font-bold">
                <i className="fas fa-phone mr-2"></i>
                +966564267351
              </div>
              <div className="flex gap-2">
                <a
                  href="https://wa.me/966564267351?text=مرحباً، أود الاستفسار عن خدمات صيانة المكيفات"
                  className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded-full text-sm font-bold transition-all duration-300 hover:scale-105"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-whatsapp mr-1"></i>
                  واتساب
                </a>
                <a
                  href="tel:+966564267351"
                  className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-full text-sm font-bold transition-all duration-300 hover:scale-105"
                >
                  <i className="fas fa-phone mr-1"></i>
                  اتصال
                </a>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900/90 to-blue-700/90 text-white text-center pt-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-up">فني صيانة وتركيب التكييفات</h1>
          <p className="text-xl mb-4 animate-fade-in-up animation-delay-200">
            خدمات صيانة وإصلاح المكيفات في المدينة المنورة
          </p>
          <p className="text-lg mb-8 opacity-90 animate-fade-in-up animation-delay-400">
            <i className="fas fa-map-marker-alt mr-2"></i>
            نخدم جميع أحياء المدينة المنورة وضواحيها
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-600">
            <a
              href="https://wa.me/966564267351?text=أود الحصول على عرض سعر مجاني لصيانة المكيف"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg w-full md:w-auto max-w-xs"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-whatsapp mr-2"></i>
              عرض سعر مجاني
            </a>
            <a
              href="tel:+966564267351"
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg w-full md:w-auto max-w-xs"
            >
              <i className="fas fa-phone mr-2"></i>
              اتصل الآن
            </a>
            <a
              href="https://wa.me/966564267351?text=أود التواصل معكم للحصول على خدمة صيانة سريعة"
              className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg w-full md:w-auto max-w-xs"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fas fa-comments mr-2"></i>
              تواصل سريع
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-blue-900 mb-4">خدماتنا في المدينة المنورة</h2>
          <div className="w-20 h-1 bg-yellow-500 mx-auto mb-12 rounded"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "صيانة مكيفات سبليت",
                description: "صيانة وإصلاح مكيفات السبليت، تنظيف شامل، فحص دوري، وضمان أداء مثالي",
                whatsappText: "أود صيانة مكيف سبليت",
              },
              {
                title: "صيانة مكيفات شباك",
                description: "إصلاح وصيانة مكيفات الشباك، تنظيف المرشحات، وإعادة تأهيل الوحدات القديمة",
                whatsappText: "أود صيانة مكيف شباك",
              },
              {
                title: "صيانة التكييف المركزي",
                description: "خدمات متخصصة للتكييف المركزي، صيانة الشبكات، وفحص الأنظمة المعقدة",
                whatsappText: "أود صيانة التكييف المركزي",
              },
              {
                title: "شحن الفريون",
                description: "شحن وتعبئة غاز الفريون لجميع أنواع المكيفات مع استخدام أحدث المعدات",
                whatsappText: "أود شحن غاز الفريون للمكيف",
              },
              {
                title: "فك وتركيب المكيفات",
                description: "خدمات فك وتركيب المكيفات بطريقة احترافية مع ضمان سلامة الوحدة",
                whatsappText: "أود خدمة فك وتركيب مكيف",
              },
              {
                title: "عقود الصيانة الدورية",
                description: "عقود صيانة سنوية وشهرية للمكيفات مع زيارات دورية وأسعار مخفضة",
                whatsappText: "أود الاستفسار عن عقود الصيانة الدورية",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-yellow-500"
              >
                <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg mb-4 flex items-center justify-center">
                  <i className="fas fa-snowflake text-6xl text-blue-600"></i>
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
                <div className="flex flex-col gap-2">
                  <a
                    href={`https://wa.me/966564267351?text=${service.whatsappText}`}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full font-bold text-center transition-all duration-300 hover:scale-105"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fab fa-whatsapp mr-2"></i>
                    طلب عبر واتساب
                  </a>
                  <a
                    href="tel:+966564267351"
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-full font-bold text-center transition-all duration-300 hover:scale-105"
                  >
                    <i className="fas fa-phone mr-2"></i>
                    اتصال مباشر
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "500+", label: "عميل راض" },
              { number: "10+", label: "سنوات خبرة" },
              { number: "24/7", label: "خدمة العملاء" },
              { number: "100%", label: "ضمان الجودة" },
            ].map((stat, index) => (
              <div key={index}>
                <h3 className="text-3xl font-bold text-yellow-400 mb-2">{stat.number}</h3>
                <p className="text-lg">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-bold text-blue-900 mb-6 text-center lg:text-right">
                فني صيانة وتركيب التكييفات - المدينة المنورة
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                فني صيانة وتركيب التكييفات هو الخيار الأول لسكان المدينة المنورة للحصول على خدمات صيانة وإصلاح المكيفات
                بأعلى معايير الجودة والمهنية.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                نحن نخدم جميع أحياء المدينة المنورة بفريق من الفنيين المهرة والمعتمدين، ونوفر خدمة سريعة للوصول إلى
                منزلك أو مكان عملك في أي وقت.
              </p>

              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg mb-6">
                <h4 className="text-blue-900 font-bold mb-3">
                  <i className="fas fa-map-marker-alt mr-2"></i>
                  نخدم جميع أحياء المدينة المنورة:
                </h4>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                  <span>• الحرم النبوي الشريف</span>
                  <span>• المنطقة المركزية</span>
                  <span>• العوالي</span>
                  <span>• قباء</span>
                  <span>• الجامعة</span>
                  <span>• الملك فهد</span>
                  <span>• طيبة</span>
                  <span>• العيون</span>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {[
                  "خدمة سريعة في جميع أحياء المدينة المنورة",
                  "فنيين مختصين ومعتمدين محلياً",
                  "قطع غيار أصلية متوفرة محلياً",
                  "خدمة عملاء 24/7 باللهجة المحلية",
                  "أسعار تنافسية لسكان المدينة",
                  "استجابة فورية خلال المدينة",
                  "ضمان شامل على الخدمات",
                  "عقود صيانة للمؤسسات والبيوت",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <span className="text-yellow-500 font-bold text-lg">✔</span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col md:flex-row gap-4">
                <a
                  href="https://wa.me/966564267351?text=أود معرفة المزيد عن خدماتكم"
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-bold text-center transition-all duration-300 hover:scale-105"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-whatsapp mr-2"></i>
                  تواصل معنا
                </a>
                <a
                  href="tel:+966564267351"
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full font-bold text-center transition-all duration-300 hover:scale-105"
                >
                  <i className="fas fa-phone mr-2"></i>
                  اتصل بنا
                </a>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="w-full h-80 bg-gradient-to-br from-blue-200 to-blue-300 rounded-xl flex items-center justify-center">
                <i className="fas fa-tools text-8xl text-blue-600"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-blue-900 mb-4">آراء عملائنا وتقييماتهم</h2>
          <div className="w-20 h-1 bg-yellow-500 mx-auto mb-12 rounded"></div>

          <div className="bg-white rounded-2xl p-8 mb-12 shadow-lg text-center">
            <div className="flex flex-col items-center gap-4 mb-8">
              <div className="text-6xl font-bold text-yellow-500">{stats.averageRating}</div>
              <div className="flex gap-1 text-2xl">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`${star <= Math.round(Number.parseFloat(stats.averageRating)) ? "text-yellow-500" : "text-gray-300"}`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="text-gray-600">من 5 نجوم (بناءً على {stats.totalReviews}+ تقييم)</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h4 className="text-lg font-bold text-blue-900 mb-4">توزيع التقييمات</h4>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((starLevel) => (
                  <div key={starLevel} className="flex items-center gap-3">
                    <span className="text-sm font-medium w-8">{starLevel} ★</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(stats.starDistribution[starLevel - 1] / stats.totalReviews) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-8">{stats.starDistribution[starLevel - 1]}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { number: `${stats.customerSatisfaction}%`, label: "رضا العملاء" },
                { number: `${stats.serviceSpeed}%`, label: "سرعة الخدمة" },
                { number: `${stats.workQuality}%`, label: "جودة العمل" },
                { number: `${stats.fairPricing}%`, label: "الأسعار العادلة" },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-blue-900">{item.number}</div>
                  <div className="text-sm text-gray-600 mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 mb-12 shadow-lg">
            <h3 className="text-2xl font-bold text-blue-900 mb-6 text-center">
              <i className="fas fa-comments mr-2"></i>
              التعليقات والتقييمات ({reviews.length})
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-96 overflow-y-auto">
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-r-4 border-yellow-500"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-900 to-blue-700 rounded-full flex items-center justify-center text-white font-bold">
                      {review.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-blue-900">{review.name}</div>
                      <div className="text-sm text-gray-500">{review.date}</div>
                    </div>
                  </div>

                  <div className="flex gap-1 mb-3 justify-center bg-yellow-50 py-2 rounded-lg">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`text-2xl transition-all duration-200 ${
                          star <= review.rating ? "text-yellow-500 drop-shadow-sm" : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                    <span className="text-sm text-gray-600 mr-2 self-center">({review.rating}/5)</span>
                  </div>

                  <p className="text-gray-700 leading-relaxed mb-3 text-sm">{review.text}</p>
                  <div className="inline-block bg-blue-50 text-blue-900 px-3 py-1 rounded-full text-xs font-medium">
                    <i className="fas fa-tools mr-1"></i>
                    {review.service}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-blue-900 mb-6 text-center">
              <i className="fas fa-star mr-2"></i>
              شاركنا تجربتك وقيم خدماتنا
            </h3>

            <div className="flex flex-col items-center gap-4 mb-6 bg-yellow-50 p-6 rounded-xl">
              <label className="block text-blue-900 font-bold text-lg">تقييمك للخدمة:</label>
              <div className="flex gap-2 text-4xl cursor-pointer">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`transition-all duration-300 transform hover:scale-110 ${
                      star <= selectedRating ? "text-yellow-500 drop-shadow-lg" : "text-gray-300 hover:text-yellow-400"
                    }`}
                    onClick={() => setSelectedRating(star)}
                  >
                    ★
                  </span>
                ))}
              </div>
              {selectedRating > 0 && <p className="text-blue-900 font-medium">لقد اخترت {selectedRating} من 5 نجوم</p>}
            </div>

            <form className="review-form">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="reviewName" className="block text-blue-900 font-bold mb-2">
                    <i className="fas fa-user mr-2"></i>
                    الاسم
                  </label>
                  <input
                    type="text"
                    id="reviewName"
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-300"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="reviewArea" className="block text-blue-900 font-bold mb-2">
                    <i className="fas fa-map-marker-alt mr-2"></i>
                    المنطقة
                  </label>
                  <select
                    id="reviewArea"
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-300"
                    required
                  >
                    <option value="">اختر منطقتك</option>
                    <option value="الحرم النبوي الشريف">الحرم النبوي الشريف</option>
                    <option value="المنطقة المركزية">المنطقة المركزية</option>
                    <option value="العوالي">العوالي</option>
                    <option value="قباء">قباء</option>
                    <option value="الجامعة">الجامعة</option>
                    <option value="الملك فهد">الملك فهد</option>
                    <option value="طيبة">طيبة</option>
                    <option value="العيون">العيون</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="reviewServiceType" className="block text-blue-900 font-bold mb-2">
                  <i className="fas fa-tools mr-2"></i>
                  نوع الخدمة التي تلقيتها
                </label>
                <select
                  id="reviewServiceType"
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-300"
                  required
                >
                  <option value="">اختر نوع الخدمة</option>
                  <option value="صيانة مكيف سبليت">صيانة مكيف سبليت</option>
                  <option value="صيانة مكيف شباك">صيانة مكيف شباك</option>
                  <option value="صيانة التكييف المركزي">صيانة التكييف المركزي</option>
                  <option value="شحن فريون">شحن فريون</option>
                  <option value="فك وتركيب">فك وتركيب</option>
                  <option value="عقد صيانة">عقد صيانة</option>
                </select>
              </div>

              <div className="mb-6">
                <label htmlFor="reviewText" className="block text-blue-900 font-bold mb-2">
                  <i className="fas fa-comment mr-2"></i>
                  تعليقك وتقييمك للخدمة
                </label>
                <textarea
                  id="reviewText"
                  rows={4}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-300"
                  placeholder="شاركنا تجربتك مع خدماتنا..."
                  required
                ></textarea>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <button
                  type="button"
                  onClick={sendReview}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-full font-bold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
                >
                  <i className="fas fa-plus-circle"></i>
                  إضافة التقييم
                </button>
                <a
                  href="tel:+966564267351"
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full font-bold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                >
                  <i className="fas fa-phone"></i>
                  اتصال مباشر
                </a>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-blue-900 mb-4">اتصل بنا الآن</h2>
          <div className="w-20 h-1 bg-yellow-500 mx-auto mb-12 rounded"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-blue-900 mb-6 text-center">معلومات التواصل</h3>

              <div className="space-y-6">
                {[
                  { icon: "fas fa-phone", title: "هاتف:", content: "+966564267351" },
                  { icon: "fab fa-whatsapp", title: "واتساب:", content: "+966564267351" },
                  { icon: "fas fa-envelope", title: "البريد الإلكتروني:", content: "info@almustafa-maintenance.com" },
                  { icon: "fas fa-map-marker-alt", title: "منطقة الخدمة:", content: "المدينة المنورة وجميع أحيائها" },
                  { icon: "fas fa-clock", title: "ساعات العمل:", content: "24 ساعة - 7 أيام في الأسبوع" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-3">
                    <i className={`${item.icon} text-2xl text-blue-900 w-8`}></i>
                    <div>
                      <strong className="block text-blue-900">{item.title}</strong>
                      <span className="text-gray-700">{item.content}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col md:flex-row gap-4 mt-8">
                <a
                  href="https://wa.me/966564267351?text=مرحباً، أود التواصل مع فني صيانة وتركيب التكييفات"
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-bold text-center transition-all duration-300 hover:scale-105"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-whatsapp mr-2"></i>
                  تواصل واتساب
                </a>
                <a
                  href="tel:+966564267351"
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full font-bold text-center transition-all duration-300 hover:scale-105"
                >
                  <i className="fas fa-phone mr-2"></i>
                  اتصل الآن
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-blue-900 mb-6 text-center">طلب خدمة سريع</h3>

              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-blue-900 font-bold mb-2">
                    الاسم الكامل
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-300"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-blue-900 font-bold mb-2">
                    رقم الهاتف
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-300"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-blue-900 font-bold mb-2">
                    نوع الخدمة المطلوبة
                  </label>
                  <select
                    id="service"
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-300"
                    required
                  >
                    <option value="">اختر نوع الخدمة</option>
                    <option value="split-ac">صيانة مكيفات سبليت</option>
                    <option value="window-ac">صيانة مكيفات شباك</option>
                    <option value="central-ac">صيانة التكييف المركزي</option>
                    <option value="freon">شحن الفريون</option>
                    <option value="installation">فك وتركيب المكيفات</option>
                    <option value="maintenance-contract">عقود الصيانة الدورية</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-blue-900 font-bold mb-2">
                    وصف المشكلة أو الخدمة المطلوبة
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-300"
                    required
                  ></textarea>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  <button
                    type="button"
                    onClick={sendWhatsAppMessage}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-bold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <i className="fab fa-whatsapp"></i>
                    إرسال للواتساب
                  </button>
                  <a
                    href="tel:+966564267351"
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full font-bold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <i className="fas fa-phone"></i>
                    اتصال مباشر
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-right">
            <div>
              <h3 className="text-xl font-bold text-yellow-400 mb-4">فني صيانة وتركيب التكييفات - المدينة المنورة</h3>
              <p className="mb-2">شريكك الموثوق في صيانة المكيفات</p>
              <p className="mb-2">نخدم جميع أحياء المدينة المنورة</p>
              <p className="font-bold mb-4">للتواصل: +966564267351</p>
              <div className="bg-white/10 p-3 rounded-lg mb-4">
                <small>
                  <i className="fas fa-clock mr-2"></i>
                  خدمة 24 ساعة في المدينة المنورة
                </small>
              </div>
              <div className="flex justify-center md:justify-start gap-4">
                <a
                  href="https://wa.me/966564267351"
                  className="bg-green-500 hover:bg-green-600 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-whatsapp text-xl"></i>
                </a>
                <a
                  href="tel:+966564267351"
                  className="bg-red-500 hover:bg-red-600 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <i className="fas fa-phone text-xl"></i>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-yellow-400 mb-4">خدماتنا</h3>
              <div className="space-y-2">
                {[
                  { text: "صيانة مكيفات سبليت", whatsapp: "أود صيانة مكيف سبليت" },
                  { text: "صيانة مكيفات شباك", whatsapp: "أود صيانة مكيف شباك" },
                  { text: "التكييف المركزي", whatsapp: "أود صيانة التكييف المركزي" },
                  { text: "شحن الفريون", whatsapp: "أود شحن غاز الفريون" },
                  { text: "فك وتركيب", whatsapp: "أود فك وتركيب مكيف" },
                  { text: "عقود الصيانة", whatsapp: "أود الاستفسار عن عقود الصيانة" },
                ].map((service, index) => (
                  <a
                    key={index}
                    href={`https://wa.me/966564267351?text=${service.whatsapp}`}
                    className="block text-gray-300 hover:text-yellow-400 transition-colors duration-300"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {service.text}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-yellow-400 mb-4">تواصل سريع</h3>
              <p className="mb-2">متاحون 24 ساعة في المدينة المنورة</p>
              <p className="mb-2">وصول سريع لجميع الأحياء</p>
              <p className="mb-4">فنيون محليون ومختصون</p>
              <div className="bg-green-500/20 p-3 rounded-lg mb-4">
                <small className="text-green-300">
                  <i className="fas fa-map-marker-alt mr-2"></i>
                  نصل إليك في أي مكان بالمدينة المنورة
                </small>
              </div>
              <a
                href="https://wa.me/966564267351?text=أود الحصول على عرض سعر في المدينة المنورة"
                className="text-green-400 hover:text-green-300 font-bold transition-colors duration-300"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-whatsapp mr-2"></i>
                احصل على عرض سعر مجاني
              </a>
            </div>
          </div>

          <hr className="border-gray-600 my-8" />

          <div className="text-center">
            <p className="mb-2">&copy; 2025 فني صيانة وتركيب التكييفات - المدينة المنورة. جميع الحقوق محفوظة.</p>
            <p>
              للتواصل في المدينة المنورة:
              <a
                href="tel:+966564267351"
                className="text-yellow-400 hover:text-yellow-300 mx-2 transition-colors duration-300"
              >
                <i className="fas fa-phone mr-1"></i> +966564267351
              </a>
              |
              <a
                href="https://wa.me/966564267351"
                className="text-green-400 hover:text-green-300 mx-2 transition-colors duration-300"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-whatsapp mr-1"></i> واتساب
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Float Button */}
      <a
        href="https://wa.me/966564267351?text=مرحباً، أود الاستفسار عن خدمات صيانة المكيفات"
        className="fixed bottom-6 left-6 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center text-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50 animate-pulse"
        target="_blank"
        rel="noreferrer"
      >
        <i className="fab fa-whatsapp"></i>
      </a>
    </div>
  )
}
