export default function (path) {
    return new URL(path, import.meta.env.VITE_STATIC_ASSET_BASE_URL).href;
}
