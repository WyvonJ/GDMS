<template>
    <footer>
        <div class="copyright">
            &copy; 2016 - {{(new Date()).getFullYear()}} | WyvonJ | Fang G | <a href="mailto:wyvonj@gmail.com">wyvonj@gmail.com</a> | JNUDM
        </div>
    </footer>
</template>

<style lang="sass" rel="stylesheet/scss">
footer
{
    position: absolute;
    bottom: 0;
    background-color: white;
    width: 100%;
    div.copyright
    {
        font-size: 12px;
        font-weight: 100;
        font-variant: small-caps;

        height: 18px;

        transition: all .8s cubic-bezier(.1,.1,.4,1);
        text-align: center;

        color: #aaa;
        border-top: 1px solid rgba(0,0,0,.08);
        a
        {
            transition: all .8s cubic-bezier(.1,.1,.4,1);
            text-decoration: none !important;

            color: #aaa !important;
        }
    }
}

</style>