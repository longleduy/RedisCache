import bcrypt from 'bcrypt';

export const hash_pass = (password) => {
    return bcrypt.hashSync(password, 10);
}
export const compare_pass = (pass_client, pass_hashed) => {
    return bcrypt.compareSync(pass_client, pass_hashed);
}
export const hash_pass_async = async (password) => {
    let hash_pass= await bcrypt.hash(password, 10);
    return hash_pass;
}
export const compare_pass_async = async (pass_client, pass_hashed) => {
    let status = await bcrypt.compare(pass_client, pass_hashed);
    return status;
}