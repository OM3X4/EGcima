import Link from "next/link"

const Footer = () => {




    return (
        <div className='bg-surface-background p-5 flex flex-col items-center gap-3 relative'>
            <h1 className="text-muted-text text-base self-start">هذا الموقع لغرض تعليمي فقط، ولا يهدف إلى تحقيق ربح أو توزيع محتوى مرئي.</h1>
            <Link href={"/"} className={"text-base text-link self-start"}>شروط الاستخدام</Link>
            <Link href={"/"} className={"text-base text-link self-start"}>سياسة الخصوصية</Link>
            <h1 className="absolute text-7xl text-text font-black right-1/2 translate-x-1/2 top-1/2 -translate-y-1/2">سينما</h1>
            <h1 dir="ltr" className="text-soft-text self-end">Some of the data shown is partially sourced from TMDB and other platforms.</h1>
        </div>
    )
}

export default Footer