export const GET = async (local) => {

    let response = null

    await fetch('http://192.168.0.2:8080/' + local)
        .then(res => res.json())
        .then(
            (result) => {
                try {
                    response = result;
                } catch (e) {
                }
            },
            (error) => {
            }
        )
    return response
}

export const SET = async (local, objeto) => {


    let response = []
    await fetch('http://192.168.0.2:8080/' + local+"/", {
        method: 'POST',
        body: await JSON.stringify(objeto)
    })
        .then(res => res.json())
        .then(
            (result) => {
                try {
                    response = result;
                } catch (e) {
                    console.log("[SUPORTE] --- erro no metodo SET: " + e)
                }
            },
            (error) => {
                alert(error)
            }
        )
    return response
}

export const SET_SEM_FORMATAR_JSON = async (local, objeto) => {

    let response = []
    await fetch('http://192.168.0.2:8080/' + local+"/", {
        method: 'POST',
        body: objeto
    })
        .then(res => res.json())
        .then(
            (result) => {
                try {
                    response = result;
                } catch (e) {
                    console.log("[SUPORTE] --- erro no metodo SET: " + e)
                }
            },
            (error) => {
                console.log("[SUPORTE] --- erro no metodo SET: " + error)
            }
        )
    return response
}
