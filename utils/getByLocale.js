import {useRouter} from "next/router";

export default (obj, key, router = useRouter()) => {
    const locale = router.locale === 'ru' ? '' : '_uz'

    return obj?.[`${key}${locale}`] || obj?.[key]
}