<script setup></script>
<template>
  <footer class="border-t border-t-lightGrey pt-10 bg-whitePrimary">
    <div class="footer-container">
      <div>
        <div>
          <img
            src="~~/assets/images/logo/logo.png"
            alt=""
            class="footer-logo"
          />
        </div>
        <p class="footer-description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi
        </p>

        <p class="footer-copyright">
          © 2024 Fetch Wireless Internet | All Rights Reserved
        </p>
      </div>
      <ul>
        <li><NuxtLink to="/events">Events</NuxtLink></li>
        <li><NuxtLink to="/messages">Messages</NuxtLink></li>
      </ul>
      <div>
        <p>505 Ellicott St. Suite A201 Buffalo, NY 14203</p>
        <p>Privacy Policy | Return Policy</p>

        <div class="flex justify-start gap-x-5 pt-4">
          <img src="../assets/images/footer/instagram.png" alt="" />
          <img src="../assets/images/footer/facebook.png" alt="" />
          <img src="../assets/images/footer/twitter.png" alt="" />
        </div>
      </div>
      <div>
        <div class="pt-10 flex md:flex-col gap-6">
          <button>
            <img src="../../assets/images/howWorks/googlePlay.png" alt="" />
          </button>
          <button>
            <img src="../../assets/images/howWorks/appStore.png" alt="" />
          </button>
        </div>
        <p class="md:invisible footer-copyright">
          © 2024 Fetch Wireless Internet | All Rights Reserved
        </p>
      </div>
    </div>
  </footer>
</template>
