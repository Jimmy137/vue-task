<template>
    <header>
        <div class="header-top">
            <a href="" class="with-icon">
                <img src="../assets/imgs/location.png" alt="">
                <span>locations</span>
            </a>
            <a href="" class="with-icon">
                <img src="../assets/imgs/envelope.png" alt="">
                <span>contact us</span>
            </a>
            <a href="" class="lang">عربي</a>
        </div>
        <nav>
            <img src="../assets/imgs/logo.png" alt="toyota">
            <div class="nav-left">
                <div class="nav-links">
                    <a href="">products</a>
                    <a href="">services</a>
                    <a href="">training</a>
                    <a href="">about us</a>
                </div>
                <img src="../assets/imgs/search.png" alt="search">
                <a href="" class="link-button">Get Quote</a>
            </div>
            
        </nav>
    </header>
</template>
<script>
export default {
  name: 'Header',
}
</script>
<style>
    
    header{
        font-family: 'Inter';
        font-size: 16px;
        display: flex;
        flex-direction: column;
        
    }
    header a{
        text-decoration: none;
        color: black;
    }
    .header-top{
        display: flex;
        align-items: center;
        justify-content: end;
        gap: 65px;
        padding: 18px 60px;
    }
    a.with-icon{
        font-family: 'Inter';
        font-weight: 400;
        text-transform: capitalize;
        display: flex;
        align-items: center;
        gap: 15px;
        
    }
    a.lang{
        font-family: "Tajawal";
        font-weight: 500;
    }
    nav{
        padding: 25px 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .nav-left{
        display: flex;
        align-items: center;
        gap: 60px;
    }
    .nav-links{
        text-transform: uppercase;
        font-family: 'Inter';
        font-size: 18px;
        font-weight: 400;
        display: flex;
        align-items: center;
        gap: 48px;
    }
    .link-button{
        background-color: #C00F23;
        color: white;
        border-radius: 18px;
        padding: 16px 27px;
        text-transform: uppercase;
        font-family: 'Inter';
        font-size: 14px;
        font-weight: 700;
        text-decoration: none;
    }
</style>