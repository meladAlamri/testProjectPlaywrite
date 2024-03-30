import dotenv from 'dotenv'
dotenv.config()
const conf = {
    key : process.env["APPLITOOLS_API_KEY"] ?? 'null'
}

export default conf